package com.raiyan_hillol.getvehicle.screens.homeScreen.view;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.navigation.NavigationView;
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view.VehicleDetailsActivity;
import com.raiyan_hillol.getvehicle.screens.homeScreen.controller.HomeScreenController;
import com.raiyan_hillol.getvehicle.utils.NavDrawerActions;

public class HomeScreenActivity extends AppCompatActivity {
    private static final String TAG = "HomeScreenActivity";

    ActionBarDrawerToggle actionBarNavigationDrawerToggle;
    private RecyclerView homeRecycleView;
    private HomeScreenController homeScreenController;
    private NavDrawerActions navDrawerActions;

    private ConstraintLayout userGmailDetails;
    private DrawerLayout navigationDrawerLayout;
    private NavigationView navigationView;
    private TextView tvUserName;
    private TextView tvUserEmail;
    private ImageView userImage;

    private GoogleSignInClient mGoogleSignInClient;
    private SignInButton signInButton;

    private GoogleSignInAccount account;

    private static final int RC_SIGN_IN = 451;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_screen);
        initWidgets();
        setUpNavigationDrawer();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);

        account = GoogleSignIn.getLastSignedInAccount(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        account = GoogleSignIn.getLastSignedInAccount(this);
    }

    private void signIn() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            updateLoginUI(account);
        } catch (ApiException e) {
            Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
            updateLoginUI(null);
        }
    }

    private void updateLoginUI(GoogleSignInAccount account) {
        userGmailDetails = findViewById(R.id.userGmailDetails);

        tvUserName = findViewById(R.id.tvUserName);
        tvUserEmail = findViewById(R.id.tvUserEmail);
        userImage = findViewById(R.id.userImage);

        if(account != null) {
            if(signInButton!=null) {
                signInButton.setVisibility(View.GONE);
            }
            userGmailDetails.setVisibility(View.VISIBLE);
            tvUserName.setVisibility(View.VISIBLE);
            tvUserEmail.setVisibility(View.VISIBLE);

            tvUserName.setText(account.getDisplayName());
            tvUserEmail.setText(account.getEmail());
            Glide.with(this)
                    .load(account.getPhotoUrl())
                    .circleCrop()
                    .into(userImage);
        } else {
            userGmailDetails.setVisibility(View.GONE);
            setDefaultDrawableOnUserImageView();
            if(signInButton!=null) {
                signInButton.setVisibility(View.VISIBLE);
            }
        }
    }

    private void setDefaultDrawableOnUserImageView() {
        String uri = "@drawable/ic_baseline_account_circle_24";
        int imageResource = getResources().getIdentifier(uri, null, getPackageName());
        Drawable res = getResources().getDrawable(imageResource);
        userImage = findViewById(R.id.userImage);
        userImage.setImageDrawable(res);
    }

    private void initWidgets() {
        homeScreenController = new HomeScreenController(this);

        homeRecycleView = findViewById(R.id.rvHomeScreenActivity);
        homeScreenController.setRecyclerViewAdapter(homeRecycleView, this);

        navDrawerActions = new NavDrawerActions(this, getSupportFragmentManager());
    }

    private void signOut() {
        mGoogleSignInClient.signOut()
                .addOnCompleteListener(this, new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        account = null;
                        updateLoginUI(null);
                    }
                });
    }

    private void setUpNavigationDrawer() {
        navigationView = (NavigationView) findViewById(R.id.navigation_view);
        navigationDrawerLayout = findViewById(R.id.navigation_drawer_layout);

        actionBarNavigationDrawerToggle = new ActionBarDrawerToggle(this, navigationDrawerLayout, R.string.nav_open, R.string.nav_close) {
            public void onDrawerClosed(View view) {
                super.onDrawerClosed(view);
                // Do whatever you want here
            }
            public void onDrawerOpened(View drawerView) {
                super.onDrawerOpened(drawerView);
                signInButton = findViewById(R.id.sign_in_button);

                signInButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        signIn();
                    }
                });
                updateLoginUI(GoogleSignIn.getLastSignedInAccount(getApplicationContext()));
            }
        };

        navigationDrawerLayout.addDrawerListener(actionBarNavigationDrawerToggle);

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.itemProfile:
                        closeDrawer();
                        break;
                    case R.id.itemHome:
                        closeDrawer();
                        break;
                    case R.id.itemAbout:
                        closeDrawer();
                        break;
                    case R.id.itemLogOut:
                        signOut();
                        break;
                    default:
                        break;
                }
                return true;
            }
        });

        actionBarNavigationDrawerToggle.syncState();

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (actionBarNavigationDrawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void closeDrawer() {
        navigationDrawerLayout.closeDrawer(GravityCompat.START);
    }

    public void startVehicleDetailActivity(String vehicleId) {
        Intent intent = new Intent(this, VehicleDetailsActivity.class);
        intent.putExtra("selected_vehicle_id", vehicleId);
        startActivity(intent);
    }

}
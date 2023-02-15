package com.raiyan_hillol.getvehicle.screens.homeScreen.view;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
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

import com.android.volley.AuthFailureError;
import com.android.volley.Cache;
import com.android.volley.Network;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.BasicNetwork;
import com.android.volley.toolbox.DiskBasedCache;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.JsonObjectRequest;
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
import com.raiyan_hillol.getvehicle.constants.AppUriConstants;
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view.VehicleDetailsActivity;
import com.raiyan_hillol.getvehicle.screens.bookingScreen.myBookingScreen.view.MyBookingScreenActivity;
import com.raiyan_hillol.getvehicle.screens.homeScreen.adapter.HomeScreenActivityRecyclerViewAdapter;
import com.raiyan_hillol.getvehicle.screens.homeScreen.controller.HomeScreenController;
import com.raiyan_hillol.getvehicle.utils.NavDrawerActions;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class HomeScreenActivity extends AppCompatActivity {
    private static final String TAG = "HomeScreenActivity";

    public static String idToken;

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
                .requestIdToken(getString(R.string.default_web_client_id))
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
            AppUriConstants.ID_TOKEN = account.getIdToken();
            AppUriConstants.USER_DATA = account;

            Log.d(TAG, "handleSignInResult: " + idToken);
            updateLoginUI(account);
        } catch (ApiException e) {
            Log.d(TAG, "signInResult:failed code=" + e);
            updateLoginUI(null);
        }
    }

    private void updateLoginUI(GoogleSignInAccount account) {
        userGmailDetails = findViewById(R.id.userGmailDetails);

        tvUserName = findViewById(R.id.tvUserName);
        tvUserEmail = findViewById(R.id.tvUserEmail);
        userImage = findViewById(R.id.userImage);

        Log.d(TAG, "updateLoginUI: account " + account);

        if (account != null) {
            createOrUpdateUser(account);

            if (signInButton != null) {
                signInButton.setVisibility(View.GONE);
            }
            userGmailDetails.setVisibility(View.VISIBLE);
            tvUserName.setVisibility(View.VISIBLE);
            tvUserEmail.setVisibility(View.VISIBLE);

            String userName = account.getEmail();
            int lastIndexOf = userName.lastIndexOf("@");

            tvUserName.setText(userName.substring(0, lastIndexOf));
            tvUserEmail.setText(account.getEmail());
            Glide.with(this)
                    .load(account.getPhotoUrl())
                    .circleCrop()
                    .into(userImage);
        } else {
            userGmailDetails.setVisibility(View.GONE);
            setDefaultDrawableOnUserImageView();
            if (signInButton != null) {
                signInButton.setVisibility(View.VISIBLE);
            }
        }
    }

    private void createOrUpdateUser(GoogleSignInAccount account) {
        RequestQueue requestQueue;
        Cache cache = new DiskBasedCache(this.getCacheDir(), 1024 * 1024); // 1MB cap
        Network network = new BasicNetwork(new HurlStack());
        requestQueue = new RequestQueue(cache, network);

        requestQueue.start();

        String url = AppUriConstants.CREATE_OR_UPDATE_USER_URI;

        String userName = account.getEmail();
        int lastIndexOf = userName.lastIndexOf("@");

        JSONObject userData = new JSONObject();
        try {
            userData.put("photoUrl", account.getPhotoUrl());
            userData.put("email", account.getEmail());
            userData.put("displayName", userName.substring(0, lastIndexOf));
        } catch (Exception ex) {
            Log.e(TAG, "createOrUpdateUser: ex ", ex);
        }

        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("token", account.getIdToken());
            requestBody.put("data", userData);
        } catch (Exception ex) {
            Log.e(TAG, "createOrUpdateUser: ex ", ex);
        }

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.POST, url, requestBody, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(HomeScreenActivity.this,
                        "Hi " + userName.substring(0, lastIndexOf) + ", Welcome to GetVehicle again!",
                        Toast.LENGTH_SHORT)
                        .show();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d(TAG, "onErrorResponse: error " + error);
                error.printStackTrace();
            }
        }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json");
                return headers;
            }
        };

        requestQueue.add(jsonArrayRequest);
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
                    case R.id.itemMyBooking:
                        goToMyBookingScreen();
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

    private void goToMyBookingScreen() {
//        Intent intent = new Intent(this, MyBookingScreenActivity.class);
//        startActivity(intent);
    }

    public void startVehicleDetailActivity(String vehicleId) {
        Intent intent = new Intent(this, VehicleDetailsActivity.class);
        intent.putExtra("selected_vehicle_id", vehicleId);
        startActivity(intent);
    }

}
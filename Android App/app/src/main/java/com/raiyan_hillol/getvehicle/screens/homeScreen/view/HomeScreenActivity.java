package com.raiyan_hillol.getvehicle.screens.homeScreen.view;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.navigation.NavigationView;
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view.VehicleDetailsActivity;
import com.raiyan_hillol.getvehicle.screens.homeScreen.controller.HomeScreenController;

public class HomeScreenActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    ActionBarDrawerToggle actionBarNavigationDrawerToggle;
    private RecyclerView homeRecycleView;
    private HomeScreenController homeScreenController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_screen);

        initWidgets();
        setUpNavigationDrawer();
    }

    private void initWidgets() {
        homeScreenController = new HomeScreenController(this);

        homeRecycleView = findViewById(R.id.rvHomeScreenActivity);
        homeScreenController.setRecyclerViewAdapter(homeRecycleView, this);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    private void setUpNavigationDrawer() {
        DrawerLayout navigationDrawerLayout;
        NavigationView navigationView;

        navigationView = (NavigationView) findViewById(R.id.navigation_view);
        navigationDrawerLayout = findViewById(R.id.navigation_drawer_layout);

        actionBarNavigationDrawerToggle = new ActionBarDrawerToggle(this, navigationDrawerLayout, R.string.nav_open, R.string.nav_close);

        navigationDrawerLayout.addDrawerListener(actionBarNavigationDrawerToggle);

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.item_1:
                        Toast.makeText(HomeScreenActivity.this, "Item 1 is selected", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.item_2:
                        Toast.makeText(HomeScreenActivity.this, "Item 2 is selected", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.item_3:
                        Toast.makeText(HomeScreenActivity.this, "Item 3 is selected", Toast.LENGTH_SHORT).show();
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

        switch (item.getItemId()) {
            case R.id.car_fragment:
                Toast.makeText(this, "Car Fragment is selected", Toast.LENGTH_SHORT).show();
                break;
            case R.id.update_profile:
                Toast.makeText(this, "Update Profile is selected", Toast.LENGTH_SHORT).show();
                break;
            case R.id.logout:
                Toast.makeText(this, "Logout is selected", Toast.LENGTH_SHORT).show();
                break;
            default:
                break;
        }

        return super.onOptionsItemSelected(item);
    }

    public void startVehicleDetailActivity(String vehicleId) {
        Intent intent = new Intent(this, VehicleDetailsActivity.class);
        intent.putExtra("selected_vehicle_id", vehicleId);
        startActivity(intent);
    }

}
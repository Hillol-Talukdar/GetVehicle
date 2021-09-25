package com.raiyan_hillol.getvehicle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationBarView;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity {

    ActionBarDrawerToggle actionBarNavigationDrawerToggle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setUpNavigationDrawer();

        setUpBottomNavigationView();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        if(actionBarNavigationDrawerToggle.onOptionsItemSelected(item)){
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
                        Toast.makeText(MainActivity.this, "Item 1 is selected", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.item_2:
                        Toast.makeText(MainActivity.this, "Item 2 is selected", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.item_3:
                        Toast.makeText(MainActivity.this, "Item 3 is selected", Toast.LENGTH_SHORT).show();
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

    private void setUpBottomNavigationView() {
        BottomNavigationView bottomNavigationView = (BottomNavigationView) findViewById(R.id.bottomNavigationView);

        bottomNavigationView.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.car_fragment:
                        Toast.makeText(MainActivity.this, "Car Fragment is selected", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.bike_fragment:
                        Toast.makeText(MainActivity.this, "Bike Fragment is selected", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.other_fragment:
                        Toast.makeText(MainActivity.this, "Other Fragment is selected", Toast.LENGTH_SHORT).show();
                        break;
                    default:
                        break;
                }
                return true;
            }
        });

    }

    public void switchFragment(Fragment fragment){
        FragmentManager fragmentManager = getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.main_activity_frame_layout, fragment);
        fragmentTransaction.commit();
    }

}
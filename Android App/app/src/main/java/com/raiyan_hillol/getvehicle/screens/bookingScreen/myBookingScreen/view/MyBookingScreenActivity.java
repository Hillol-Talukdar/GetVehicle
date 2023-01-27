package com.raiyan_hillol.getvehicle.screens.bookingScreen.myBookingScreen.view;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.View;

import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.databinding.ActivityMyBookingScreenBinding;
import com.raiyan_hillol.getvehicle.screens.bookingScreen.myBookingScreen.controller.MyBookingScreenController;

public class MyBookingScreenActivity extends AppCompatActivity {
    private static final String TAG = "MyBookingScreenActivity";

    private ActivityMyBookingScreenBinding binding;
    private RecyclerView rvMyBooking;
    private MyBookingScreenController myBookingScreenController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMyBookingScreenBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        initWidgets();
    }

    private void initWidgets() {
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        myBookingScreenController = new MyBookingScreenController(this);

        rvMyBooking = findViewById(R.id.rvMyBooking);
        myBookingScreenController.setRecyclerViewAdapter(rvMyBooking, this);

    }
}
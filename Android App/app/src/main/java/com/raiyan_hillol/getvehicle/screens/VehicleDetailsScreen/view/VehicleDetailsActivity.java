package com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.databinding.ActivityVehicleDetailsBinding;

public class VehicleDetailsActivity extends AppCompatActivity {

    private ActivityVehicleDetailsBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_vehicle_details);

        binding = ActivityVehicleDetailsBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);


        loadVehicleDetails();
        initWedgies();
    }

    private void loadVehicleDetails() {
        Intent intent = getIntent();
        String vehicleId = intent.getStringExtra("selected_vehicle_id");
//        VehicleData singleVehicleData = Tools.getSingleVehicle(vehicleId, getApplicationContext());

        VehicleUseCase.getSingleVehicle(vehicleId, getApplicationContext());

//        TextView vehicleModel = findViewById(R.id.vehicle_model_detail);
//        TextView vehicleType = findViewById(R.id.vehicle_type_detail);
//        TextView vehicleTransmission = findViewById(R.id.vehicle_transmission_detail);
//        TextView vehicleCurrentLocation = findViewById(R.id.current_location_detail);
//
//        vehicleModel.setText(singleVehicleData.getModel());
//        vehicleType.setText(singleVehicleData.getVehicleType());
//        vehicleTransmission.setText(singleVehicleData.getTransmission());
//        vehicleCurrentLocation.setText(singleVehicleData.getCurrentLocation());
    }

    private void initWedgies() {
//        binding.tvModel =
    }
}
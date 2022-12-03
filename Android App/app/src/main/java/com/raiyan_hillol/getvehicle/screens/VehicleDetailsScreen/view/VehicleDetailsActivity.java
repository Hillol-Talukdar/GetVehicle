package com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

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
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.constants.AppUriConstants;
import com.raiyan_hillol.getvehicle.data.model.VehicleData;
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.databinding.ActivityVehicleDetailsBinding;

import org.json.JSONException;
import org.json.JSONObject;

public class VehicleDetailsActivity extends AppCompatActivity {

    private ActivityVehicleDetailsBinding binding;
    private static VehicleData currentSelectedVehicleData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_vehicle_details);

        binding = ActivityVehicleDetailsBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        if(currentSelectedVehicleData == null) {
            getCurrentVehicleDetails();
        }
        initWedgies();
    }

    private void getCurrentVehicleDetails() {
        Intent intent = getIntent();
        String vehicleId = intent.getStringExtra("selected_vehicle_id");
        getSingleVehicle(vehicleId, getApplicationContext());
    }

    private void setVehicleDetailsToView() {

//        VehicleData singleVehicleData = Tools.getSingleVehicle(vehicleId, getApplicationContext());
        TextView vehicleModel = findViewById(R.id.tvModel);
        vehicleModel.setText(currentSelectedVehicleData.getModel());
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

    public void getSingleVehicle(String vehicleId, Context context) {
        RequestQueue requestQueue;
        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap
        Network network = new BasicNetwork(new HurlStack());
        requestQueue = new RequestQueue(cache, network);

        requestQueue.start();

        String url = AppUriConstants.GET_ALL_VEHICLE_URI + vehicleId;
//        String url = "http://192.168.0.9:4000/api/vehicle/" + vehicleId;

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                try {
                    currentSelectedVehicleData = VehicleUseCase.getVehicleDataFromJSONObject(response.getJSONObject("data"));
                    setVehicleDetailsToView();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                getSingleVehicle(vehicleId, context);
                error.printStackTrace();
            }
        });
        requestQueue.add(jsonArrayRequest);
    }
}
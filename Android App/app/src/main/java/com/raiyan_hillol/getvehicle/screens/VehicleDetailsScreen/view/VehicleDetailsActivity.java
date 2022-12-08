package com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

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
import com.denzcoskun.imageslider.ImageSlider;
import com.denzcoskun.imageslider.models.SlideModel;
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.constants.AppUriConstants;
import com.raiyan_hillol.getvehicle.data.model.VehicleData;
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.databinding.ActivityVehicleDetailsBinding;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class VehicleDetailsActivity extends AppCompatActivity {
    private static final String TAG = "VehicleDetailsActivity";
    private static VehicleData currentSelectedVehicleData;

    private ActivityVehicleDetailsBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVehicleDetailsBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        getCurrentVehicleDetails();
    }

    private void getCurrentVehicleDetails() {
        Intent intent = getIntent();
        String vehicleId = intent.getStringExtra("selected_vehicle_id");
        getSingleVehicle(vehicleId, getApplicationContext());
    }

    private void setupImageSlider() {
        ArrayList<String> allPhotos = currentSelectedVehicleData.getPhoto();
        ArrayList<SlideModel> imageList = new ArrayList<>();

        for (int i = 0; i < allPhotos.size(); i++) {
            imageList.add(new SlideModel(allPhotos.get(i), null));
        }

        binding.imageSliderVehicle.setImageList(imageList);
    }

    @SuppressLint("SetTextI18n")
    private void setVehicleDetailsToView() throws JSONException {
        setupImageSlider();

        binding.tvModel.setText(currentSelectedVehicleData.getModel());
        binding.tvCostPerDay.setText(getString(R.string.cost_per_day, currentSelectedVehicleData.getCostPerDay()));
        binding.tvRating.setText(getString(R.string.rating_out_of, currentSelectedVehicleData.getAverageRating(), 5.0));
        binding.tvLocation.setText(currentSelectedVehicleData.getCurrentLocationString());
        binding.tvEngine.setText(currentSelectedVehicleData.getEngine());
        binding.tvMileage.setText(currentSelectedVehicleData.getMileage() + getString(R.string.km_per_hour));
        binding.llFuelType.setText(currentSelectedVehicleData.getFuelType());
        binding.tvCategory.setText(currentSelectedVehicleData.getCategory().getString("name"));
        binding.tvSubCategory.setText(currentSelectedVehicleData.getSubCategory().getString("name"));
        binding.tvSeatCount.setText(Integer.toString(currentSelectedVehicleData.getSeatCount()));
        binding.tvTransmission.setText(currentSelectedVehicleData.getTransmission());
        binding.tvBootSpace.setText(currentSelectedVehicleData.getBootSpace());
        binding.tvGroundClearance.setText(currentSelectedVehicleData.getGroundClearance());
    }

    public void getSingleVehicle(String vehicleId, Context context) {
        RequestQueue requestQueue;
        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap
        Network network = new BasicNetwork(new HurlStack());
        requestQueue = new RequestQueue(cache, network);

        requestQueue.start();

        String url = AppUriConstants.GET_ALL_VEHICLE_URI + vehicleId;

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
package com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.view;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
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
import com.denzcoskun.imageslider.models.SlideModel;
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.constants.AppUriConstants;
import com.raiyan_hillol.getvehicle.data.model.VehicleData;
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.databinding.ActivityVehicleDetailsBinding;
import com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.controller.VehicleDetailsController;
import com.raiyan_hillol.getvehicle.screens.homeScreen.controller.HomeScreenController;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class VehicleDetailsActivity extends AppCompatActivity {
    private static final String TAG = "VehicleDetailsActivity";
    private static VehicleData currentSelectedVehicleData;
    private VehicleDetailsController vehicleDetailsController;

    private ActivityVehicleDetailsBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVehicleDetailsBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        vehicleDetailsController = new VehicleDetailsController(this);

        getCurrentVehicleDetails();

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
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

    private String getProperTextForInfo(String info) {
        if(info.isEmpty()){
            return "N/A";
        } else {
            return info;
        }
    }

    @SuppressLint("SetTextI18n")
    private void setVehicleDetailsToView() throws JSONException {
        setupImageSlider();

        binding.tvModel.setText(currentSelectedVehicleData.getModel());
        binding.tvCostPerDay.setText(getString(R.string.cost_per_day, currentSelectedVehicleData.getCostPerDay()));
        binding.tvRating.setText(getString(R.string.rating_out_of, currentSelectedVehicleData.getAverageRating(), 5.0));
        binding.tvLocation.setText(currentSelectedVehicleData.getCurrentLocationString());
        binding.tvEngine.setText(currentSelectedVehicleData.getEngine());
        binding.tvMileage.setText(currentSelectedVehicleData.getMileage() + getString(R.string.km_per_liter));
        binding.llFuelType.setText(currentSelectedVehicleData.getFuelType());
        binding.tvCategory.setText(currentSelectedVehicleData.getCategory().getString("name"));
        binding.tvSubCategory.setText(currentSelectedVehicleData.getSubCategory().getString("name"));
        binding.tvSeatCount.setText(Integer.toString(currentSelectedVehicleData.getSeatCount()));
        binding.tvTransmission.setText(getProperTextForInfo(currentSelectedVehicleData.getTransmission()));
        binding.tvBootSpace.setText(getProperTextForInfo(currentSelectedVehicleData.getBootSpace()));
        binding.tvGroundClearance.setText(getProperTextForInfo(currentSelectedVehicleData.getGroundClearance()));

        RecyclerView recyclerView = findViewById(R.id.rvReviews);
        vehicleDetailsController.setRecyclerViewAdapter(currentSelectedVehicleData, recyclerView, this);
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
                    currentSelectedVehicleData = VehicleUseCase.getVehicleDataFromJSONObject(response.getJSONObject("data"), true);
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
package com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.controller;

import android.content.Context;
import android.view.View;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

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
import com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.adapter.VehicleDetailsRecyclerViewAdapter;
import com.raiyan_hillol.getvehicle.screens.homeScreen.adapter.HomeScreenActivityRecyclerViewAdapter;

import org.json.JSONObject;

public class VehicleDetailsController {
    private static final String TAG = "VehicleDetailsControlle";
    private Context context;

    public VehicleDetailsController(Context context) {
        this.context = context;
    }

    public void setRecyclerViewAdapter(VehicleData vehicleData, View view, Context context) {
        RecyclerView recyclerView;
        VehicleDetailsRecyclerViewAdapter recyclerViewAdapter;

        recyclerView = view.findViewById(R.id.rvReviews);
        recyclerViewAdapter = new VehicleDetailsRecyclerViewAdapter(vehicleData.getReviews(), context);
        recyclerView.setAdapter(recyclerViewAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));
    }

}

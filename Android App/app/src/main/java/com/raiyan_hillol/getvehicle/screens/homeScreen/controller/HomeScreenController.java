package com.raiyan_hillol.getvehicle.screens.homeScreen.controller;

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
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.screens.homeScreen.adapter.HomeScreenActivityRecyclerViewAdapter;

import org.json.JSONObject;

public class HomeScreenController {
    private static final String TAG = "HomeScreenController";
    private Context context;

    public HomeScreenController(Context context) {
        this.context = context;
    }

    public void setRecyclerViewAdapter(View view, Context context) {
        RequestQueue requestQueue;
        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap
        Network network = new BasicNetwork(new HurlStack());
        requestQueue = new RequestQueue(cache, network);

        requestQueue.start();

//        String url = "http://192.168.0.9:4000/api/vehicle/";
        String url = AppUriConstants.GET_ALL_VEHICLE_URI;
//        Log.d(TAG, "setRecyclerViewAdapter: " + AppUriConstants.GET_ALL_VEHICLE_URI);

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                RecyclerView recyclerView;
                HomeScreenActivityRecyclerViewAdapter recyclerViewAdapter;

                recyclerView = view.findViewById(R.id.rvHomeScreenActivity);
                recyclerViewAdapter = new HomeScreenActivityRecyclerViewAdapter(VehicleUseCase.getAllVehiclesFromJSONObject(response), context);
                recyclerView.setAdapter(recyclerViewAdapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                setRecyclerViewAdapter(view, context);
                error.printStackTrace();
            }
        });
        requestQueue.add(jsonArrayRequest);
    }
}

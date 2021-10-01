package com.raiyan_hillol.getvehicle;

import android.content.Context;
import android.util.Log;
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
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Tools {

    public static String getFormattedShortDetails(VehicleData vehicleData){
        String formattedShortDetails;

        formattedShortDetails = vehicleData.getVehicleType();
        formattedShortDetails += " | ";
        formattedShortDetails += vehicleData.getSeatCount() + " Seater ";
        formattedShortDetails += " | ";
        formattedShortDetails += vehicleData.getTransmission();

        return formattedShortDetails;
    }

    public static void setRecyclerViewAdapter(View fragmentView, Context context) {

        Log.d("Raiyan13", "Starting now...........");

        RequestQueue requestQueue;

        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap


        Network network = new BasicNetwork(new HurlStack());


        requestQueue = new RequestQueue(cache, network);


        requestQueue.start();

        String url ="http://192.168.0.5:4000/api/vehicle";

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {

                ArrayList<VehicleData> allVehicleData = new ArrayList<>();
                
                try {
                    JSONArray jsonArray = response.getJSONArray("data");
                    Log.d("Raiyan13", jsonArray.toString());
                    for(int i=0; i<jsonArray.length(); i++){
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        allVehicleData.add(new VehicleData(jsonObject.getString("_id"), jsonObject.getString("model"), 4, jsonObject.getString("currentLocation"), jsonObject.getString("vehicleType"), jsonObject.getString("transmission")));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                RecyclerView recyclerView;
                MainActivityRecyclerViewAdapter recyclerViewAdapter;

                recyclerView = fragmentView.findViewById(R.id.main_activity_recycler_view);
                recyclerViewAdapter = new MainActivityRecyclerViewAdapter(allVehicleData);
                recyclerView.setAdapter(recyclerViewAdapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Raiyan13", error.getMessage());
            }
        });

        requestQueue.add(jsonArrayRequest);

//
//        allVehicleData.add(new VehicleData("1", "BMW 7 Series", 4, "Dhaka,Bangladesh", "SEDAN", "Automatic"));
//        allVehicleData.add(new VehicleData("2", "Volvo XC90", 4, "Sylhet,Bangladesh", "HATCHBACK", "Automatic"));
//        allVehicleData.add(new VehicleData("3", "Mahindra Thar", 4, "Rajshahi,Bangladesh", "SUV", "Manual"));
//        allVehicleData.add(new VehicleData("4", "Mahindra XUV700", 4, "Barishal,Bangladesh", "SUV", "Automatic"));

    }
}


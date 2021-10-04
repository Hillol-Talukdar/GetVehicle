package com.raiyan_hillol.getvehicle;

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

    private static ArrayList<String> getStringArrayListFromJSONArray(JSONArray jsonArray) throws JSONException {
        ArrayList<String>stringArrayList = new ArrayList<>();

        for(int i=0; i<jsonArray.length(); i++){
            stringArrayList.add(jsonArray.getString(i));
        }

        return stringArrayList;
    }

    public static void setRecyclerViewAdapter(View fragmentView, Context context) {

        RequestQueue requestQueue;

        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap


        Network network = new BasicNetwork(new HurlStack());


        requestQueue = new RequestQueue(cache, network);


        requestQueue.start();

        String url ="http://192.168.0.5:4000/api/vehicle";

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {

                RecyclerView recyclerView;
                MainActivityRecyclerViewAdapter recyclerViewAdapter;
                ArrayList<VehicleData> allVehicleData = new ArrayList<>();

                try {
                    JSONArray jsonArray = response.getJSONArray("data");
                    for(int i=0; i<jsonArray.length(); i++){
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        allVehicleData.add(new VehicleData(
                                jsonObject.getString("_id"),
                                jsonObject.getString("model"),
                                jsonObject.getString("vehicleType"),
//                                jsonObject.getString("genericType"),
                                jsonObject.getString("transmission"),
                                jsonObject.getString("fuelType"),
                                jsonObject.getString("engine"),
//                                jsonObject.getString("bootSpace"),
//                                jsonObject.getString("groundClearance"),
                                jsonObject.getDouble("costPerDay"),
//                                jsonObject.getInt("seatCount"),
//                                jsonObject.getDouble("Mileage"),
//                                jsonObject.getDouble("averageRating"),
                                jsonObject.getJSONObject("currentLocation").getString("address")
//                                jsonObject.getBoolean("bookingStatus"),
//                                getStringArrayListFromJSONArray(jsonObject.getJSONArray("photos")),
//                                jsonObject.getString("user")
                        ));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                recyclerView = fragmentView.findViewById(R.id.main_activity_recycler_view);
                recyclerViewAdapter = new MainActivityRecyclerViewAdapter(allVehicleData, context);
                recyclerView.setAdapter(recyclerViewAdapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                setRecyclerViewAdapter(fragmentView, context);
                error.printStackTrace();
            }
        });
        requestQueue.add(jsonArrayRequest);
    }

    public static VehicleData getSingleVehicleData(String vehicleId) {
        VehicleData vehicleData = null;
        return vehicleData;
    }
}


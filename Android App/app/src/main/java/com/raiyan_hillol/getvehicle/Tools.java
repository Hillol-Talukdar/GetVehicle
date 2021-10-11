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

    public static ArrayList<String> getStringArrayListFromJSONArray(JSONArray jsonArray) throws JSONException {
        ArrayList<String>stringArrayList = new ArrayList<>();

        for(int i=0; i<jsonArray.length(); i++){
            stringArrayList.add(jsonArray.getString(i));
        }

        return stringArrayList;
    }

    //TODO: make the response things reusable
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

                recyclerView = fragmentView.findViewById(R.id.main_activity_recycler_view);
                recyclerViewAdapter = new MainActivityRecyclerViewAdapter(getAllVehiclesFromJSONObject(response), context);
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

    //TODO: make the response things reusable
    public static VehicleData getSingleVehicle(String vehicleId, Context context) {

        final VehicleData[] vehicleData = new VehicleData[1];

        RequestQueue requestQueue;

        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap


        Network network = new BasicNetwork(new HurlStack());


        requestQueue = new RequestQueue(cache, network);


        requestQueue.start();

        String url ="http://192.168.0.5:4000/api/vehicle/" + vehicleId;

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                vehicleData[0] = getVehicleFromJSONObject(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                getSingleVehicle(vehicleId, context);
                error.printStackTrace();
            }
        });
        requestQueue.add(jsonArrayRequest);

        return vehicleData[0];
    }

    private static VehicleData getVehicleFromJSONObject(JSONObject response) {
        VehicleData vehicleData = null;
        try {
            JSONObject jsonObject = response.getJSONObject("data");
            vehicleData = new VehicleData(
                    jsonObject.getString("_id"),
                    jsonObject.getString("model"),
                    jsonObject.getString("vehicleType"),
                    jsonObject.getString("genericType"),
                    jsonObject.getString("transmission"),
                    jsonObject.getString("fuelType"),
                    jsonObject.getString("engine"),
                    jsonObject.getString("bootSpace"),
                    jsonObject.getString("groundClearance"),
                    jsonObject.getDouble("costPerDay"),
                    jsonObject.getInt("seatCount"),
                    jsonObject.getDouble("Mileage"),
                    jsonObject.getDouble("averageRating"),
                    jsonObject.getJSONObject("currentLocation").getString("address"),
                    jsonObject.getBoolean("bookingStatus"),
                    Tools.getStringArrayListFromJSONArray(jsonObject.getJSONArray("photos")),
                    jsonObject.getString("user"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return vehicleData;
    }

    public static ArrayList<VehicleData> getAllVehiclesFromJSONObject(JSONObject jsonObject) {
        ArrayList<VehicleData> allVehicleData = new ArrayList<>();
        try {
            JSONArray jsonArray = jsonObject.getJSONArray("data");
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObjectArray = jsonArray.getJSONObject(i);
                allVehicleData.add(new VehicleData(
                        jsonObjectArray.getString("_id"),
                        jsonObjectArray.getString("model"),
                        jsonObjectArray.getString("vehicleType"),
                        jsonObjectArray.getString("genericType"),
                        jsonObjectArray.getString("transmission"),
                        jsonObjectArray.getString("fuelType"),
                        jsonObjectArray.getString("engine"),
                        jsonObjectArray.getString("bootSpace"),
                        jsonObjectArray.getString("groundClearance"),
                        jsonObjectArray.getDouble("costPerDay"),
                        jsonObjectArray.getInt("seatCount"),
                        jsonObjectArray.getDouble("Mileage"),
                        jsonObjectArray.getDouble("averageRating"),
                        jsonObjectArray.getJSONObject("currentLocation").getString("address"),
                        jsonObjectArray.getBoolean("bookingStatus"),
                        Tools.getStringArrayListFromJSONArray(jsonObjectArray.getJSONArray("photos")),
                        jsonObjectArray.getString("user")));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return allVehicleData;
    }

}


package com.raiyan_hillol.getvehicle.utils;

import android.content.Context;
import android.util.Log;

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
import com.raiyan_hillol.getvehicle.data.model.VehicleData;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Tools {
    private static final String TAG = "Tools";

    public static String getVehicleFormattedShortDetails(VehicleData vehicleData) {
        String formattedShortDetails = "";
        try {
            formattedShortDetails = vehicleData.getCategory().getString("name");
            formattedShortDetails += " | ";
            formattedShortDetails += vehicleData.getSeatCount() + " Seater ";
            formattedShortDetails += " | ";
            formattedShortDetails += vehicleData.getTransmission();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (formattedShortDetails.length() == 0) {
                formattedShortDetails = "";
            }
        }

        return formattedShortDetails;
    }

    public static ArrayList<String> getStringArrayListFromJSONArray(JSONArray jsonArray) throws JSONException {
        ArrayList<String> stringArrayList = new ArrayList<>();

        if(jsonArray == null || jsonArray.length() == 0) {
            stringArrayList.add(String.valueOf(R.drawable.temp_car_image));
        } else {
            for (int i = 0; i < jsonArray.length(); i++) {
                stringArrayList.add(jsonArray.getString(i));
            }
        }

        return stringArrayList;
    }

    //TODO: make the response things reusable
    public static void getSingleVehicle(String vehicleId, Context context) {

        final VehicleData[] vehicleData = new VehicleData[1];

        RequestQueue requestQueue;

        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap


        Network network = new BasicNetwork(new HurlStack());


        requestQueue = new RequestQueue(cache, network);


        requestQueue.start();

        String url = "http://192.168.0.9:4000/api/vehicle/" + vehicleId;

        JsonObjectRequest jsonArrayRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                vehicleData[0] = getVehicleFromJSONObject(response);
                Log.d("Raiyan13", "The response: \n" + response);
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

    private static VehicleData getVehicleFromJSONObject(JSONObject response) {
        VehicleData vehicleData = null;
        try {
            JSONObject jsonObject = response.getJSONObject("data");
            vehicleData = new VehicleData(
                    jsonObject.getString("_id"),
                    jsonObject.getString("model"),
                    jsonObject.getString("vehicleType"),
//                    jsonObject.getString("genericType"),
                    jsonObject.getString("transmission"),
                    jsonObject.getString("fuelType"),
                    jsonObject.getString("engine"),
//                    jsonObject.getString("bootSpace"),
//                    jsonObject.getString("groundClearance"),
                    jsonObject.getInt("costPerDay"),
//                    jsonObject.getInt("seatCount"),
//                    jsonObject.getDouble("Mileage"),
//                    jsonObject.getDouble("averageRating"),
                    jsonObject.getJSONObject("currentLocation").getString("address")
//                    jsonObject.getBoolean("bookingStatus"),
//                    Tools.getStringArrayListFromJSONArray(jsonObject.getJSONArray("photos")),
//                    jsonObject.getString("user")
            );
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
                        jsonObjectArray.getJSONObject("category"),
//                        jsonObjectArray.getJSONObject("subCategory"),
                        jsonObjectArray.getString("transmission"),
                        jsonObjectArray.getString("fuelType"),
                        jsonObjectArray.getString("engine"),
                        jsonObjectArray.getString("bootSpace"),
                        jsonObjectArray.getString("groundClearance"),
                        jsonObjectArray.getInt("costPerDay"),
                        jsonObjectArray.getInt("seatCount"),
                        jsonObjectArray.getInt("mileage"),
                        jsonObjectArray.getDouble("averageRating"),
                        jsonObjectArray.getString("currentLocationString"),
                        jsonObjectArray.getBoolean("bookingStatus"),
                        Tools.getStringArrayListFromJSONArray(jsonObjectArray.getJSONArray("photo")),
                        jsonObjectArray.getBoolean("isTrashed")
                ));
            }

            Log.d(TAG, "getAllVehiclesFromJSONObject: " + allVehicleData);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return allVehicleData;
    }

}


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

    public static ArrayList<String> getSanitizedPhotos(JSONArray photosJsonArray, JSONObject vehicleCategory) throws JSONException {
        ArrayList<String> sanitizedPhotos = new ArrayList<>();
        String vehicleCategoryName = vehicleCategory.getString("name");

        if(photosJsonArray == null || photosJsonArray.length() == 0) {
            if(vehicleCategoryName.equals("Car")) {
                sanitizedPhotos.add(String.valueOf(R.drawable.template_car_image));
            } else {
                sanitizedPhotos.add(String.valueOf(R.drawable.template_bike_image));
            }
        } else {
            for (int i = 0; i < photosJsonArray.length(); i++) {
                sanitizedPhotos.add(photosJsonArray.getString(i));
            }
        }

        return sanitizedPhotos;
    }

    //TODO: make the response things reusable
    public static void getSingleVehicle(String vehicleId, Context context) {

        final VehicleData[] vehicleData = new VehicleData[1];

        RequestQueue requestQueue;

        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap


        Network network = new BasicNetwork(new HurlStack());


        requestQueue = new RequestQueue(cache, network);


        requestQueue.start();

//        String url = AppUriRoutes.GET_ALL_VEHICLE_URI + vehicleId;
        String url = "http://192.168.0.9:4000/api/vehicle/" + vehicleId;

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
            JSONArray responseData = jsonObject.getJSONArray("data");
            for (int i = 0; i < responseData.length(); i++) {
                JSONObject vehicleObject = responseData.getJSONObject(i);

                VehicleData vehicleData = new VehicleData();
                vehicleData.setId(vehicleObject.getString("_id"));
                vehicleData.setModel(vehicleObject.getString("model"));
                vehicleData.setCategory(vehicleObject.getJSONObject("category"));
                vehicleData.setSubCategory(vehicleObject.getJSONObject("subCategory"));
                vehicleData.setTransmission(vehicleObject.getString("transmission"));
                vehicleData.setFuelType(vehicleObject.getString("fuelType"));
                vehicleData.setEngine(vehicleObject.getString("engine"));
                vehicleData.setBootSpace(vehicleObject.getString("bootSpace"));
                vehicleData.setGroundClearance(vehicleObject.getString("groundClearance"));
                vehicleData.setCostPerDay(vehicleObject.getInt("costPerDay"));
                vehicleData.setSeatCount(vehicleObject.getInt("seatCount"));
                vehicleData.setMileage(vehicleObject.getInt("mileage"));
                vehicleData.setAverageRating(vehicleObject.getDouble("averageRating"));
                vehicleData.setCurrentLocationString(vehicleObject.getString("currentLocationString"));
                vehicleData.setBookingStatus(vehicleObject.getBoolean("bookingStatus"));
                vehicleData.setPhoto(Tools.getSanitizedPhotos(vehicleObject.getJSONArray("photo"), vehicleData.getCategory()));
                vehicleData.setTrashed(vehicleObject.getBoolean("isTrashed"));

                allVehicleData.add(vehicleData);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return allVehicleData;
    }

}


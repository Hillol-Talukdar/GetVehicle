package com.raiyan_hillol.getvehicle.data.usecase;

import android.content.Context;

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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class VehicleUseCase {
    private static final String TAG = "VehicleUseCase";

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



    public static VehicleData getVehicleDataFromJSONObject(JSONObject vehicleObject) {
        VehicleData vehicleData = new VehicleData();
        try {
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
            vehicleData.setPhoto(VehicleUseCase.getSanitizedPhotos(vehicleObject.getJSONArray("photo"), vehicleData.getCategory()));
            vehicleData.setTrashed(vehicleObject.getBoolean("isTrashed"));
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
                allVehicleData.add(getVehicleDataFromJSONObject(responseData.getJSONObject(i)));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return allVehicleData;
    }

}


package com.raiyan_hillol.getvehicle.data.usecase;

import android.util.Log;

import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.data.model.Rating;
import com.raiyan_hillol.getvehicle.data.model.Review;
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
            formattedShortDetails += "Engine " + vehicleData.getEngine();
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

    public static Rating getRatingObject(JSONObject ratingObject) throws JSONException {
        Rating rating = new Rating();
        rating.setId(ratingObject.getString("_id"));
        rating.setStar(ratingObject.getInt("star"));
        rating.setPostedBy(ratingObject.getString("postedBy"));
        return rating;
    }

    public static Review getReviewObject(JSONObject reviewObject) throws JSONException {
        Review review = new Review();

        Log.d(TAG, "getReviewObject: " + reviewObject);
        review.setId(reviewObject.getString("_id"));
        review.setStar(reviewObject.getInt("rating"));
        review.setPostedBy(reviewObject.getJSONObject("user"));
        review.setComment(reviewObject.getString("comment"));
        review.setPostedDate(reviewObject.getString("createdAt"));
        return review;
    }

    public static ArrayList<Review> getReviewObjectArray(JSONArray reviewJsonArray) throws JSONException {
        ArrayList<Review> reviews = new ArrayList<>();
        for (int i = 0; i < reviewJsonArray.length(); i++) {
            reviews.add(getReviewObject((JSONObject) reviewJsonArray.get(i)));
        }
        return reviews;
    }

    public static ArrayList<Rating> getRatingObjectArray(JSONArray ratingsJsonArray) throws JSONException {
        ArrayList<Rating> ratings = new ArrayList<>();
        for (int i = 0; i < ratingsJsonArray.length(); i++) {
            ratings.add(getRatingObject((JSONObject) ratingsJsonArray.get(i)));
        }
        return ratings;
    }

    public static double getAverageRating(ArrayList<Rating> ratings) {
        double averageRating = 0;
        for(int i=0; i<ratings.size(); i++) {
            averageRating+= ratings.get(i).getStar();
        }
        return averageRating/ratings.size();
    }

    public static VehicleData getVehicleDataFromJSONObject(JSONObject vehicleObject, boolean isGettingSingleData) {
        VehicleData vehicleData = new VehicleData();
        try {
            vehicleData.setId(vehicleObject.getString("_id"));
            vehicleData.setModel(vehicleObject.getString("model"));
            vehicleData.setCategory(vehicleObject.getJSONObject("category"));
            if(isGettingSingleData) {
                vehicleData.setSubCategory(vehicleObject.getJSONObject("subCategory"));
                vehicleData.setReviews(getReviewObjectArray(vehicleObject.getJSONArray("reviews")));
            } else {
                vehicleData.setSubCategoryId(vehicleObject.getString("subCategory"));
            }
            vehicleData.setTransmission(vehicleObject.getString("transmission"));
            vehicleData.setFuelType(vehicleObject.getString("fuelType"));
            vehicleData.setEngine(vehicleObject.getString("engine"));
            vehicleData.setBootSpace(vehicleObject.getString("bootSpace"));
            vehicleData.setGroundClearance(vehicleObject.getString("groundClearance"));
            vehicleData.setCostPerDay(vehicleObject.getInt("costPerDay"));
            vehicleData.setSeatCount(vehicleObject.getInt("seatCount"));
            vehicleData.setMileage(vehicleObject.getInt("mileage"));
            vehicleData.setRating(getRatingObjectArray(vehicleObject.getJSONArray("ratings")));
            vehicleData.setAverageRating(getAverageRating(vehicleData.getRating()));
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
                if(!responseData.getJSONObject(i).getBoolean("isTrashed")) {
                    allVehicleData.add(getVehicleDataFromJSONObject(responseData.getJSONObject(i), false));
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return allVehicleData;
    }

}


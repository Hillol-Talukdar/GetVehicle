package com.raiyan_hillol.getvehicle;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class VehicleData {

    private String id;
    private String model;
    private String vehicleType;
    private String genericType;
    private String transmission;
    private String fuelType;
    private String engine;
    private String bootSpace;
    private String groundClearance;
    private double costPerDay;
    private int seatCount;
    private double mileage;
    private double averageRating;
    private String currentLocation;
    private boolean bookingStatus;
    private ArrayList<String> photos;
    private String userId;
    private String createTime;
    private String updateTime;

    public VehicleData(String id, String model, int seatCount, String location, String vehicleType, String transmission) {
        this.id = id;
        this.model = model;
        this.seatCount = seatCount;
        this.currentLocation = location;
        this.vehicleType = vehicleType;
        this.transmission = transmission;
    }

    public VehicleData(String id, String model, String vehicleType, String genericType, String transmission, String fuelType, String engine, String bootSpace, String groundClearance, double costPerDay, int seatCount, double mileage, double averageRating, String currentLocation, boolean bookingStatus, ArrayList<String> photos, String userId) {
        this.id = id;
        this.model = model;
        this.vehicleType = vehicleType;
        this.genericType = genericType;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.engine = engine;
        this.bootSpace = bootSpace;
        this.groundClearance = groundClearance;
        this.costPerDay = costPerDay;
        this.seatCount = seatCount;
        this.mileage = mileage;
        this.averageRating = averageRating;
        this.currentLocation = currentLocation;
        this.bookingStatus = bookingStatus;
        this.photos = photos;
        this.userId = userId;
    }

    public VehicleData(String id, String model, String vehicleType, String genericType, String transmission, String fuelType, String engine, String bootSpace, String groundClearance, double costPerDay, int seatCount, double mileage, double averageRating, String currentLocation, boolean bookingStatus, ArrayList<String> photos, String userId, String createTime, String updateTime) {
        this.id = id;
        this.model = model;
        this.vehicleType = vehicleType;
        this.genericType = genericType;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.engine = engine;
        this.bootSpace = bootSpace;
        this.groundClearance = groundClearance;
        this.costPerDay = costPerDay;
        this.seatCount = seatCount;
        this.mileage = mileage;
        this.averageRating = averageRating;
        this.currentLocation = currentLocation;
        this.bookingStatus = bookingStatus;
        this.photos = photos;
        this.userId = userId;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getGenericType() {
        return genericType;
    }

    public void setGenericType(String genericType) {
        this.genericType = genericType;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public String getBootSpace() {
        return bootSpace;
    }

    public void setBootSpace(String bootSpace) {
        this.bootSpace = bootSpace;
    }

    public String getGroundClearance() {
        return groundClearance;
    }

    public void setGroundClearance(String groundClearance) {
        this.groundClearance = groundClearance;
    }

    public double getCostPerDay() {
        return costPerDay;
    }

    public void setCostPerDay(double costPerDay) {
        this.costPerDay = costPerDay;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public double getMileage() {
        return mileage;
    }

    public void setMileage(double mileage) {
        this.mileage = mileage;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public boolean isBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(boolean bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public ArrayList<String> getPhotos() {
        return photos;
    }

    public void setPhotos(ArrayList<String> photos) {
        this.photos = photos;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

}

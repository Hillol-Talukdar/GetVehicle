package com.raiyan_hillol.getvehicle.data.model;

import java.util.ArrayList;
import org.json.JSONObject;

public class VehicleData {
    private String id;
    private String model;
    private JSONObject category = new JSONObject();
    private JSONObject subCategory = new JSONObject();
    private String transmission;
    private String fuelType;
    private String engine;
    private String bootSpace;
    private String groundClearance;
    private JSONObject user;
    private String currentLocationString;
    private ArrayList<String> photo;
    private int costPerDay;
    private int seatCount;
    private int mileage;
    private double averageRating;
    private boolean bookingStatus;
    private boolean isTrashed;


    private String vehicleType;
    private String userId;
    private String createTime;
    private String updateTime;

    public VehicleData() {

    }

    public VehicleData(String id, String model, JSONObject category,
                       JSONObject subCategory,
                       String transmission,
                       String fuelType, String engine, String bootSpace, String groundClearance,
                       int costPerDay, int seatCount, int mileage, double averageRating,
                       String currentLocationString, boolean bookingStatus, ArrayList<String> photo,
                       boolean isTrashed) {
        this.id = id;
        this.model = model;
        this.category = category;
        this.subCategory = subCategory;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.engine = engine;
        this.bootSpace = bootSpace;
        this.groundClearance = groundClearance;
        this.costPerDay = costPerDay;
        this.seatCount = seatCount;
        this.mileage = mileage;
        this.averageRating = averageRating;
        this.currentLocationString = currentLocationString;
        this.bookingStatus = bookingStatus;
        this.photo = photo;
        this.isTrashed = isTrashed;
    }

    public VehicleData(String id, String model, String vehicleType, String transmission,
                       String fuelType, String engine, int costPerDay, String location) {
        this.id = id;
        this.model = model;
        this.vehicleType = vehicleType;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.engine = engine;
        this.costPerDay = costPerDay;
        this.currentLocationString = location;
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

    public int getCostPerDay() {
        return costPerDay;
    }

    public void setCostPerDay(int costPerDay) {
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

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public String getCurrentLocationString() {
        return currentLocationString;
    }

    public void setCurrentLocationString(String currentLocationString) {
        this.currentLocationString = currentLocationString;
    }

    public boolean isBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(boolean bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public ArrayList<String> getPhoto() {
        return photo;
    }

    public void setPhoto(ArrayList<String> photo) {
        this.photo = photo;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUser(JSONObject user) {
        this.user = user;
    }

    public JSONObject getUser() {
        return user;
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

    public void setIsTrashed(boolean isTrashed) {
        this.isTrashed = isTrashed;
    }

    public boolean getIsTrashed() {
        return isTrashed;
    }

    public void setCategory(JSONObject category) {
        this.category = category;
    }

    public JSONObject getCategory() {
        return category;
    }

    public void setSubCategory(JSONObject subCategory) {
        this.subCategory = subCategory;
    }

    public JSONObject getSubCategory() {
        return subCategory;
    }

    public boolean isTrashed() {
        return isTrashed;
    }

    public void setTrashed(boolean trashed) {
        isTrashed = trashed;
    }
}

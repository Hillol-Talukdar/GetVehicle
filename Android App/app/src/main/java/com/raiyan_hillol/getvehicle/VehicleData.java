package com.raiyan_hillol.getvehicle;

public class VehicleData {

    private String id;
    private String model;
    private int seatCount;
    private String location;
    private String vehicleType;
    private String transmission;

    public VehicleData(String id, String model, int seatCount, String location, String vehicleType, String transmission) {
        this.id = id;
        this.model = model;
        this.seatCount = seatCount;
        this.location = location;
        this.vehicleType = vehicleType;
        this.transmission = transmission;
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

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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
}

package com.raiyan_hillol.getvehicle.data.model;

import org.json.JSONObject;

import java.util.Date;

public class BookingData {
    private String id;
    private int totalAmount;
    private int totalDays;
    private boolean paid;
    private boolean handedOver;
    private boolean received;
    private boolean isCanceled;
    private boolean isTrashed;
    private Date handOverDate;
    private Date receiveDate;
    private String paymentMethod;
    private String userPhoneNumber;
    private JSONObject user;
    private JSONObject vehicle;

    public BookingData() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(int totalDays) {
        this.totalDays = totalDays;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public boolean isHandedOver() {
        return handedOver;
    }

    public void setHandedOver(boolean handedOver) {
        this.handedOver = handedOver;
    }

    public boolean isReceived() {
        return received;
    }

    public void setReceived(boolean received) {
        this.received = received;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
    }

    public boolean isTrashed() {
        return isTrashed;
    }

    public void setTrashed(boolean trashed) {
        isTrashed = trashed;
    }

    public Date getHandOverDate() {
        return handOverDate;
    }

    public void setHandOverDate(Date handOverDate) {
        this.handOverDate = handOverDate;
    }

    public Date getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Date receiveDate) {
        this.receiveDate = receiveDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }

    public JSONObject getUser() {
        return user;
    }

    public void setUser(JSONObject user) {
        this.user = user;
    }

    public JSONObject getVehicle() {
        return vehicle;
    }

    public void setVehicle(JSONObject vehicle) {
        this.vehicle = vehicle;
    }
}

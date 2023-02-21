package com.raiyan_hillol.getvehicle.data.usecase;

import com.raiyan_hillol.getvehicle.data.model.BookingData;
import com.raiyan_hillol.getvehicle.data.model.VehicleData;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class BookingUseCase {

    public static BookingData getBookingDataFromJSONObject(JSONObject bookingObject) {
        BookingData bookingData = new BookingData();

        try{
            bookingData.setId(bookingObject.getString("id"));
            bookingData.setTotalAmount(bookingObject.getInt("totalAmount"));
            bookingData.setTotalDays(bookingObject.getInt("totalDays"));
            bookingData.setPaid(bookingObject.getBoolean("paid"));
            bookingData.setHandedOver(bookingObject.getBoolean("handedOver"));
            bookingData.setReceived(bookingObject.getBoolean("received"));
            bookingData.setCanceled(bookingObject.getBoolean("setCanceled"));
            bookingData.setTrashed(bookingObject.getBoolean("setTrashed"));
//            bookingData.setHandOverDate(bookingObject.getString("setHandOverDate"));
//            bookingData.setReceiveDate(bookingObject.getString("setReceiveDate"));
            bookingData.setPaymentMethod(bookingObject.getString("setPaymentMethod"));
            bookingData.setUserPhoneNumber(bookingObject.getString("totalAmount"));
            bookingData.setUser(bookingObject.getJSONObject("totalAmount"));
            bookingData.setVehicle(bookingObject.getJSONObject("totalAmount"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return bookingData;
    }

    public static ArrayList<BookingData> getAllBookingsFromJSONObject(JSONObject jsonObject) {
        ArrayList<BookingData> allBookingData = new ArrayList<>();
        try {
            JSONArray responseData = jsonObject.getJSONArray("data");
            for (int i = 0; i < responseData.length(); i++) {
                if(!responseData.getJSONObject(i).getBoolean("isTrashed")) {
                    allBookingData.add(getBookingDataFromJSONObject(responseData.getJSONObject(i)));
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return allBookingData;
    }
}

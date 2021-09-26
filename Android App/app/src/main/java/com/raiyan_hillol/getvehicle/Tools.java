package com.raiyan_hillol.getvehicle;

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
}


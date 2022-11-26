package com.raiyan_hillol.getvehicle.utils;

public class AppUriRoutes {
    public static final String HTTP = "http://";
    public static final String APP_PORT = ":4000";
    public static final String IP4_ADDRESS = Utilities.getIPAddress(true);
    public static final String GET_ALL_VEHICLE_URI = HTTP + IP4_ADDRESS + APP_PORT + "/api/vehicle/";
}

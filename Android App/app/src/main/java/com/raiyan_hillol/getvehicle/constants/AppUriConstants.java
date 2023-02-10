package com.raiyan_hillol.getvehicle.constants;

import com.raiyan_hillol.getvehicle.utils.NetworkUtils;

public class AppUriConstants {
    public static String ID_TOKEN = "";
    public static final String HTTP = "http://";
    public static final String SERVER_PORT = ":4000";
//    public static final String IP4_ADDRESS = "192.168.0.9";
    public static final String IP4_ADDRESS = "192.168.0.8";
    public static final String URL = HTTP + IP4_ADDRESS + SERVER_PORT;

    public static final String GET_ALL_VEHICLE_URI =  URL + "/api/vehicle/";
    public static final String GET_ALL_MY_URI =  URL + "/api/booking/my";
}

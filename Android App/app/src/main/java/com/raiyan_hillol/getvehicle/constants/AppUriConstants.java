package com.raiyan_hillol.getvehicle.constants;

import com.raiyan_hillol.getvehicle.utils.NetworkUtils;

public class AppUriConstants {
    public static final String HTTP = "http://";
    public static final String SERVER_PORT = ":4000";
    public static final String IP4_ADDRESS = NetworkUtils.getIPAddress(true);
    public static final String GET_ALL_VEHICLE_URI = HTTP + IP4_ADDRESS + SERVER_PORT + "/api/vehicle/";
}

package com.raiyan_hillol.getvehicle.constants;

import com.google.android.gms.auth.api.signin.GoogleSignInAccount;

public class AppUriConstants {
    public static String ID_TOKEN = "";
    public static GoogleSignInAccount USER_DATA = null;
    public static final String HTTP = "http://";
    public static final String SERVER_PORT = ":4000";
//    public static final String IP4_ADDRESS = "192.168.0.9";
    public static final String IP4_ADDRESS = "192.168.0.8";
    public static final String URL = HTTP + IP4_ADDRESS + SERVER_PORT;

    public static final String GET_ALL_VEHICLE_URI =  URL + "/api/vehicle/";
    public static final String GET_ALL_MY_BOOKIN_URI =  URL + "/api/booking/my";
    public static final String CREATE_OR_UPDATE_USER_URI =  URL + "/api/auth/user-create-or-update/";
}

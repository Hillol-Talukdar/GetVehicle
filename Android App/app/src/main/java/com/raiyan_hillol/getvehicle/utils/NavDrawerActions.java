package com.raiyan_hillol.getvehicle.utils;

import android.content.Context;
import android.widget.Toast;

import androidx.fragment.app.FragmentManager;

public class NavDrawerActions {
    private Context context;
    private FragmentManager supportFragmentManager;

    public NavDrawerActions(Context context, FragmentManager supportFragmentManager) {
        this.context = context;
        this.supportFragmentManager = supportFragmentManager;
    }

    public void goToHomeScreen() {
        Toast.makeText(context, "Home clicked", Toast.LENGTH_SHORT).show();
    }
}

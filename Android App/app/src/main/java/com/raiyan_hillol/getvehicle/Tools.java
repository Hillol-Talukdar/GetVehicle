package com.raiyan_hillol.getvehicle;

import android.content.Context;
import android.view.View;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

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

    public static void setRecyclerViewAdapter(View fragmentView, Context context) {
        RecyclerView recyclerView;
        MainActivityRecyclerViewAdapter recyclerViewAdapter;

        ArrayList<VehicleData> allVehicleData = new ArrayList<>();

        allVehicleData.add(new VehicleData("1", "BMW 7 Series", 4, "Dhaka,Bangladesh", "SEDAN", "Automatic"));
        allVehicleData.add(new VehicleData("2", "Volvo XC90", 4, "Sylhet,Bangladesh", "HATCHBACK", "Automatic"));
        allVehicleData.add(new VehicleData("3", "Mahindra Thar", 4, "Rajshahi,Bangladesh", "SUV", "Manual"));
        allVehicleData.add(new VehicleData("4", "Mahindra XUV700", 4, "Barishal,Bangladesh", "SUV", "Automatic"));

        recyclerView = fragmentView.findViewById(R.id.main_activity_recycler_view);
        recyclerViewAdapter = new MainActivityRecyclerViewAdapter(allVehicleData);
        recyclerView.setAdapter(recyclerViewAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));
    }
}


package com.raiyan_hillol.getvehicle;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

public class CarsFragment extends Fragment {

    private View fragmentView;
    RecyclerView recyclerView;
    MainActivityRecyclerViewAdapter recyclerViewAdapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        fragmentView = inflater.inflate(R.layout.fragment_cars, container, false);
        setRecyclerViewAdapter();
        return fragmentView;
    }

    private void setRecyclerViewAdapter() {

        ArrayList<VehicleData> allVehicleData = new ArrayList<>();

        allVehicleData.add(new VehicleData("1", "BMW 7 Series", 4, "Dhaka,Bangladesh", "SEDAN", "Automatic"));
        allVehicleData.add(new VehicleData("2", "Volvo XC90", 4, "Sylhet,Bangladesh", "HATCHBACK", "Automatic"));
        allVehicleData.add(new VehicleData("3", "Mahindra Thar", 4, "Rajshahi,Bangladesh", "SUV", "Manual"));
        allVehicleData.add(new VehicleData("4", "Mahindra XUV700", 4, "Barishal,Bangladesh", "SUV", "Automatic"));

        recyclerView = fragmentView.findViewById(R.id.main_activity_recycler_view);
        recyclerViewAdapter = new MainActivityRecyclerViewAdapter(allVehicleData);
        recyclerView.setAdapter(recyclerViewAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity().getApplicationContext()));
    }

}
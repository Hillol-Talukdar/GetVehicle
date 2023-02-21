package com.raiyan_hillol.getvehicle.screens.bookingScreen.myBookingScreen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.data.model.BookingData;
import com.raiyan_hillol.getvehicle.data.model.Review;
import com.raiyan_hillol.getvehicle.data.model.VehicleData;
import com.raiyan_hillol.getvehicle.data.usecase.VehicleUseCase;
import com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.adapter.VehicleDetailsRecyclerViewAdapter;
import com.raiyan_hillol.getvehicle.screens.homeScreen.adapter.HomeScreenActivityRecyclerViewAdapter;
import com.raiyan_hillol.getvehicle.screens.homeScreen.view.HomeScreenActivity;

import org.json.JSONException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.TimeZone;

public class MyBookingRecyclerViewAdapter  extends RecyclerView.Adapter<MyBookingRecyclerViewAdapter.ViewHolder>{
    ArrayList<BookingData> allBookingData;
    Context context;

    public MyBookingRecyclerViewAdapter(ArrayList<BookingData> allBookingData, Context context) {
        this.allBookingData = allBookingData;
        this.context = context;
    }

    @NonNull
    @Override
    public MyBookingRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.home_screen_item_layout, parent, false);
        return new ViewHolder(view);
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull MyBookingRecyclerViewAdapter.ViewHolder holder, int position) {

//        holder.vehicleModel.setText(allBookingData.get(position).getVehicle().model);
        holder.vehicleShortDetails.setText(String.valueOf(allBookingData.get(position).getTotalAmount()));
//        holder.tvVehiclePrice.setText(allVehicleData.get(position).getCostPerDay() + " BDT / Day");
    }

    @Override
    public int getItemCount() {
        return this.allBookingData.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        ImageView vehicleThumbnail;
        TextView vehicleModel;
        TextView vehicleShortDetails;
        TextView tvVehiclePrice;
        TextView vehicleLocation;
        Button vehicleDetailsButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            vehicleThumbnail = itemView.findViewById(R.id.vehicle_thumbnail);
            vehicleModel = itemView.findViewById(R.id.tvVehicleModel);
            vehicleShortDetails = itemView.findViewById(R.id.tvVehicleShortDetail);
            tvVehiclePrice = itemView.findViewById(R.id.tvVehiclePrice);
        }
    }
}

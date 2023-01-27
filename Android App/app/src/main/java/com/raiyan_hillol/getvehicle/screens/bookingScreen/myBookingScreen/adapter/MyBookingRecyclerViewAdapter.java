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
    ArrayList<VehicleData> allVehicleData;
    Context context;

    public MyBookingRecyclerViewAdapter(ArrayList<VehicleData> vehicleData, Context context) {
        this.allVehicleData = vehicleData;
        this.context = context;
    }

    @NonNull
    @Override
    public MyBookingRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.home_screen_item_layout, parent, false);
        return new MyBookingRecyclerViewAdapter.ViewHolder(view);
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull MyBookingRecyclerViewAdapter.ViewHolder holder, int position) {
        if(!allVehicleData.get(position).getPhoto().isEmpty()) {
            String image = allVehicleData.get(position).getPhoto().get(0);
            boolean isImage = image.endsWith(".jpg");
            if(isImage) {
                Glide.with(this.context).load(image).into(holder.vehicleThumbnail);
            } else {
                holder.vehicleThumbnail.setImageResource(Integer.parseInt(image));
            }
        }
        holder.vehicleModel.setText(allVehicleData.get(position).getModel());
        holder.vehicleShortDetails.setText(VehicleUseCase.getVehicleFormattedShortDetails(allVehicleData.get(position)));
        holder.tvVehiclePrice.setText(allVehicleData.get(position).getCostPerDay() + " BDT / Day");
//        holder.vehicleLocation.setText(allVehicleData.get(position).getCurrentLocationString());
    }

    @Override
    public int getItemCount() {
        return this.allVehicleData.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

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

        @Override
        public void onClick(View v) {
            if (context instanceof HomeScreenActivity) {
                ((HomeScreenActivity) context).startVehicleDetailActivity(allVehicleData.get(this.getAbsoluteAdapterPosition()).getId());
            }
        }
    }
}

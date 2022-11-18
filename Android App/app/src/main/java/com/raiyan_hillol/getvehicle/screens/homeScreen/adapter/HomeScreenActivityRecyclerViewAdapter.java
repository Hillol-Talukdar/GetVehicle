package com.raiyan_hillol.getvehicle.screens.homeScreen.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.utils.Tools;
import com.raiyan_hillol.getvehicle.utils.VehicleData;
import com.raiyan_hillol.getvehicle.screens.homeScreen.view.HomeScreenActivity;

import java.util.ArrayList;

public class HomeScreenActivityRecyclerViewAdapter extends RecyclerView.Adapter<HomeScreenActivityRecyclerViewAdapter.ViewHolder> {

    ArrayList<VehicleData> allVehicleData;
    Context context;

    public HomeScreenActivityRecyclerViewAdapter(ArrayList<VehicleData> vehicleData, Context context) {
        this.allVehicleData = vehicleData;
        this.context = context;
    }

    @NonNull
    @Override
    public HomeScreenActivityRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.home_screen_item_layout, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull HomeScreenActivityRecyclerViewAdapter.ViewHolder holder, int position) {
        holder.vehicleModel.setText(allVehicleData.get(position).getModel());
        holder.vehicleShortDetails.setText(Tools.getFormattedShortDetails(allVehicleData.get(position)));
        holder.vehicleLocation.setText(allVehicleData.get(position).getCurrentLocation());
    }

    @Override
    public int getItemCount() {
        return this.allVehicleData.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        ImageView vehicleThumbnail;
        TextView vehicleModel;
        TextView vehicleShortDetails;
        TextView vehicleLocation;
        Button vehicleDetailsButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            vehicleThumbnail = itemView.findViewById(R.id.vehicle_thumbnail);
            vehicleModel = itemView.findViewById(R.id.vehicle_model);
            vehicleShortDetails = itemView.findViewById(R.id.vehicle_short_detail);
            vehicleLocation = itemView.findViewById(R.id.vehicle_location);
            vehicleDetailsButton = itemView.findViewById(R.id.view_item_details_button);

            itemView.setOnClickListener(this::onClick);
            vehicleDetailsButton.setOnClickListener(this::onClick);

        }

        @Override
        public void onClick(View v) {
            if (context instanceof HomeScreenActivity) {
                ((HomeScreenActivity) context).startVehicleDetailActivity(allVehicleData.get(this.getAbsoluteAdapterPosition()).getId());
            }
        }
    }
}

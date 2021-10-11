package com.raiyan_hillol.getvehicle;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.w3c.dom.Text;

import java.util.ArrayList;

public class MainActivityRecyclerViewAdapter extends RecyclerView.Adapter<MainActivityRecyclerViewAdapter.ViewHolder> {

    ArrayList<VehicleData> allVehicleData;
    Context context;

    public MainActivityRecyclerViewAdapter(ArrayList<VehicleData> vehicleData, Context context) {
        this.allVehicleData = vehicleData;
        this.context = context;
    }

    @NonNull
    @Override
    public MainActivityRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_item_layout, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MainActivityRecyclerViewAdapter.ViewHolder holder, int position) {
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
            if(context instanceof MainActivity){
                ((MainActivity)context).startVehicleDetailActivity(allVehicleData.get(this.getAbsoluteAdapterPosition()).getId());
            }
        }
    }
}

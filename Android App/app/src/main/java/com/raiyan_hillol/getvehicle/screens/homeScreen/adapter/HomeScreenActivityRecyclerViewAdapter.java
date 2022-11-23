package com.raiyan_hillol.getvehicle.screens.homeScreen.adapter;

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

import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.utils.Tools;
import com.raiyan_hillol.getvehicle.data.model.VehicleData;
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

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull HomeScreenActivityRecyclerViewAdapter.ViewHolder holder, int position) {
//        holder.vehicleThumbnail.setImageURI(Uri.parse(allVehicleData.get(position).getPhoto().get(0)));
        holder.vehicleModel.setText(allVehicleData.get(position).getModel());
        holder.vehicleShortDetails.setText(Tools.getVehicleFormattedShortDetails(allVehicleData.get(position)));
        holder.tvVehiclePrice.setText(Integer.toString(allVehicleData.get(position).getCostPerDay()));
        holder.vehicleLocation.setText(allVehicleData.get(position).getCurrentLocationString());
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
            vehicleLocation = itemView.findViewById(R.id.tvVehicleLocation);
            tvVehiclePrice = itemView.findViewById(R.id.tvVehiclePrice);
            vehicleDetailsButton = itemView.findViewById(R.id.btnViewItemDetailsButton);

//            itemView.setOnClickListener(this::onClick);
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

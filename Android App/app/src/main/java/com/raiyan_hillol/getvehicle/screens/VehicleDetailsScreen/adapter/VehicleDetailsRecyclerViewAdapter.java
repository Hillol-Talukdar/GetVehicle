package com.raiyan_hillol.getvehicle.screens.VehicleDetailsScreen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.raiyan_hillol.getvehicle.R;
import com.raiyan_hillol.getvehicle.data.model.Review;
import org.json.JSONException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.TimeZone;

public class VehicleDetailsRecyclerViewAdapter  extends RecyclerView.Adapter<VehicleDetailsRecyclerViewAdapter.ViewHolder>{

    ArrayList<Review> allReviewData;
    Context context;

    public VehicleDetailsRecyclerViewAdapter(ArrayList<Review> allReviewData, Context context) {
        this.allReviewData = allReviewData;
        this.context = context;
    }

    @NonNull
    @Override
    public VehicleDetailsRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.review_item_layout, parent, false);
        return new VehicleDetailsRecyclerViewAdapter.ViewHolder(view);
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull VehicleDetailsRecyclerViewAdapter.ViewHolder holder, int position) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat output = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedTime = "";

        try {
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date postedDate = sdf.parse(allReviewData.get(position).getPostedDate());
            formattedTime = output.format(postedDate);
        } catch (ParseException e) {
            formattedTime = "";
        }


        try {
            holder.tvAuthorName.setText(allReviewData.get(position).getPostedBy().getString("name"));
        } catch (JSONException e) {
            holder.tvAuthorName.setText("");
        }

        holder.tvRating.setText(String.valueOf(allReviewData.get(position).getStar()) + ".0/5.0");
        holder.tvDate.setText(formattedTime);
        holder.tvReviewDetails.setText(allReviewData.get(position).getComment());
    }

    @Override
    public int getItemCount() {
        return allReviewData.size();
    }


    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView tvAuthorName;
        TextView tvRating;
        TextView tvDate;
        TextView tvReviewDetails;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            tvAuthorName = itemView.findViewById(R.id.tvAuthorName);
            tvRating = itemView.findViewById(R.id.tvRating);
            tvDate = itemView.findViewById(R.id.tvDate);
            tvReviewDetails = itemView.findViewById(R.id.tvReviewDetails);

        }

    }
}

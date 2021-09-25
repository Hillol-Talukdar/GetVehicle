package com.raiyan_hillol.getvehicle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.lifecycle.Lifecycle;
import androidx.viewpager2.adapter.FragmentStateAdapter;

public class MainActivityFragmentAdapter extends FragmentStateAdapter {
    public MainActivityFragmentAdapter(@NonNull FragmentManager fragmentManager, @NonNull Lifecycle lifecycle) {
        super(fragmentManager, lifecycle);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {

        switch (position){
            case 1:
                return new BikesFragment();
            case 2:
                return new OthersFragment();
        }

        return new CarsFragment();
    }

    @Override
    public int getItemCount() {
        return 3;
    }
}

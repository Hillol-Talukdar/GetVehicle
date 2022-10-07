import React, { useState } from 'react';
import { useSelector } from "react-redux";

const initState = {
  model: '',
  categories: [],
  subCategory: [],
  category: '',
  transmission: '',
  fuelType: '',
  engine: '',
  shipping: '',
  bootSpace: '',
  groundClearance: '',
  costPerDay: 0,
  seatCount: 1,
  mileage: 0,
  currentLocation: '',
  bookingStatus: false,
  photo: [],
};

const CreateItemContainer = () => {
  const [values, setValues] = useState(initState);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>CreateItemContainer</div>
    </>
  );
};

export default CreateItemContainer;

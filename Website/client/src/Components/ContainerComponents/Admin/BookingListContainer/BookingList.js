import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllBookings } from '../../../../Services/BookingDataService';
import './BookingList.css';

const BookingList = () => {
  const user = useSelector((state) => state.userReducer);
  const [allBookings, setAllBookings] = useState([]);

  const loadAllBookings = () => {
    getAllBookings(user.token).then((res)=>{
        setAllBookings(res.data.data);
        console.log(res.data.data);
    }).catch((err)=>{
        console.log(err.message);
    })
  }

  useEffect(()=>{
    loadAllBookings();
  }, []);

  return (
    <p>Booking List Page</p>
  );
};

export default BookingList;

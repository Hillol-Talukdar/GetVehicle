import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllBookings } from '../../../../Services/BookingDataService';
import BookingSingleItem from '../../../Item/BookingSingleItem/BookingSingleItem';
import './BookingList.css';

const BookingList = () => {
  const user = useSelector((state) => state.userReducer);
  const [allBookings, setAllBookings] = useState([]);

  const loadAllBookings = () => {
    getAllBookings(user.token).then((res)=>{
        setAllBookings(res.data.data);
        // console.log(res.data.data);
    }).catch((err)=>{
        console.log(err.message);
    })
  }

  useEffect(()=>{
    loadAllBookings();
  }, []);

  return (
    <Container>
      <h4>Booking List</h4>
      <div className="d-flex flex-wrap">
        {allBookings.map((item) => (
          !item.isTrashed && ( <BookingSingleItem item={item} loadAllBookings={loadAllBookings}></BookingSingleItem> )
        ))}
      </div>
    </Container>
  );
};

export default BookingList;

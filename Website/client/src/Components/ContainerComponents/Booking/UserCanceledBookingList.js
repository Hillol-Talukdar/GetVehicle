import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllMyBookings } from '../../../Services/BookingDataService';
import BookingSingleItemDetails from '../../Item/BookingSingleItemDetails/BookingSingleItemDetails';

const UserCanceledBookingList = () => {
  const user = useSelector((state) => state.userReducer);
  const [allBookings, setAllBookings] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const loadAllBookings = () => {
    getAllMyBookings(user.token)
      .then((res) => {
        setAllBookings(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadAllBookings();
    setIsDataUpdated(false);
  }, [isDataUpdated]);

  return (
    <Container>
      <h4>Canceled Booking List</h4>
      <div className="d-flex flex-wrap">
        {allBookings.map(
          (item) =>
            (!item?.isTrashed &&
            item?.isCanceled) && (
              <BookingSingleItemDetails
                item={item}
                loadAllBookings={loadAllBookings}
                setIsDataUpdated={setIsDataUpdated}
                isAdminPanel={false}
              ></BookingSingleItemDetails>
            )
        )}
      </div>
    </Container>
  );
};

export default UserCanceledBookingList;
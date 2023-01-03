import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllBookings } from '../../../../Services/BookingDataService';
import BookingSingleItem from '../../../Item/BookingSingleItem/BookingSingleItem';
import BookingSingleItemDetails from '../../../Item/BookingSingleItemDetails/BookingSingleItemDetails';

const CanceledBookingList = () => {
  const user = useSelector((state) => state.userReducer);
  const [allBookings, setAllBookings] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const loadAllBookings = () => {
    getAllBookings(user.token)
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
              ></BookingSingleItemDetails>
            )
        )}
      </div>
    </Container>
  );
};

export default CanceledBookingList;

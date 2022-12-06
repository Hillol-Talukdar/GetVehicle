import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { MdDateRange } from 'react-icons/md';
import { BiRightArrowAlt } from 'react-icons/bi';

const BookedSchedulesModal = ({ show, handleClose, scheduledBookings }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booked Schedules</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            textAlign: 'center',
          }}
        >
          {scheduledBookings.map((booking) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <MdDateRange style={{ marginRight: '10px' }} />{' '}
              {booking?.handOverDate}{' '}
              <BiRightArrowAlt
                style={{ marginRight: '10px', marginLeft: '10px' }}
              />{' '}
              {booking?.receiveDate}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookedSchedulesModal;

import React from 'react';
import { Button, Modal } from 'react-bootstrap';


const BookedSchedulesModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booked Schedules</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p></p>
        </Modal.Body>

        <Modal.Footer>
          {/* <Link className="btn btn-warning" to="/">
            Go To Home
          </Link>
          <Button variant="primary" onClick={startGoogleLoginProcess}>
            Google Login
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookedSchedulesModal;

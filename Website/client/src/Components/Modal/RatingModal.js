import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const [show, setShow] = useState(false);

  let navigate = useNavigate();

  const handleShow = () => {
    if (user && user.token) {
      setShow(true);
    } else {
      navigate('/login');
    }
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        {user ? (
          <Button variant='warning' onClick={handleShow}>Rate Now</Button>
        ) : (
          <Button variant='warning' disabled>Login To Rate</Button>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate The Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default RatingModal;

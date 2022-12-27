import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AiOutlineStar } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  let { id } = useParams();

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
      <div onClick={handleShow}>
        {user ? (
          <p
            className="h6 mt-1 text-primary"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Rate now
          </p>
        ) : (
          <p
            className="h6 mt-1 text-primary"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login to Rate
          </p>
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

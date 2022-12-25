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
        <AiOutlineStar
          style={{ fontSize: '21px', cursor: 'pointer' }}
          className="text-warning"
        />
        <br />{' '}
        {user ? (
          <p
            className="h6 small mt-1 text-primary"
            style={{ cursor: 'pointer' }}
          >
            Rate now
          </p>
        ) : (
          <p className="h6 small mt-1 text-primary">Login to Rate</p>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate The Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default RatingModal;

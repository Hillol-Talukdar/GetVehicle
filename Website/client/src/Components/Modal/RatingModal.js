import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UserRole } from '../../Constants/CommonConstants';

const RatingModal = ({ 
  children,
  user,
  showModal,
  handleShowModal,
  handleCloseModal,
 }) => {

  return (
    <>
      <div>
        {user && user?.role === UserRole.USER ? (
          <Button variant='warning' onClick={handleShowModal}>Rate Now</Button>
        ) : (
          <Button variant='warning' disabled>Rate Now</Button>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rate The Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default RatingModal;

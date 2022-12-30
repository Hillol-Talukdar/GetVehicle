import React from 'react';
import { ListGroup, Modal } from 'react-bootstrap';

const UserDetailsModal = ({ userData, userPhoneNumber, show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>user info</Modal.Title>
        </Modal.Header>

        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between">
            Name :<span>{userData?.name}</span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between">
            Email :<span>{userData?.email}</span>
          </ListGroup.Item>

          {(userPhoneNumber != null && userPhoneNumber != '')  && (
            <ListGroup.Item className="d-flex justify-content-between">
              Phone Number :<span>{userPhoneNumber}</span>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal>
    </>
  );
};

export default UserDetailsModal;

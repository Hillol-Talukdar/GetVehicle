import React from 'react';
import { Image, ListGroup, Modal } from 'react-bootstrap';

const UserDetailsModal = ({ userData, userPhoneNumber, show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>


        {userData?.imageUrl && (<Image
        id={userData?._id}
          src={userData?.imageUrl}
          alt="Image of User"
          key={userData?._id}
          style={{margin:"auto", padding: "10px"}}
        />) }
        <ListGroup>
        <ListGroup.Item className="d-flex justify-content-between">
            User Id:<span>{userData?._id}</span>
          </ListGroup.Item>

          {userData?.role && (<ListGroup.Item className="d-flex justify-content-between">
            Role:<span>{userData?.role}</span>
          </ListGroup.Item>)}

          <ListGroup.Item className="d-flex justify-content-between">
            Name:<span>{userData?.name}</span>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between">
            Email:<span>{userData?.email}</span>
          </ListGroup.Item>

          {userPhoneNumber && userPhoneNumber !== '' && (
            <ListGroup.Item className="d-flex justify-content-between">
              Phone Number:<span>{userPhoneNumber}</span>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal>
    </>
  );
};

export default UserDetailsModal;

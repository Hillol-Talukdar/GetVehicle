import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DocumentDetailsModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Required Documents</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p></p>
        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentDetailsModal;

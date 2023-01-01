import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const DocumentDetailsModal = ({ show, handleClose, acknowledgement, setAcknowledgementFromModal }) => {
  const setAcknowledgement = (e) => {
    setAcknowledgementFromModal(e.target.checked);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Required Documents</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul>
            <li>Your NID(National ID Card)</li>
            <li>Photocopy of your NID</li>
            <li>Driving License (who will drive)</li>
            <li>Photocopy Driving License</li>
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Form.Check onChange={setAcknowledgement} defaultChecked={acknowledgement} aria-label="acknowledge" />
          <span className="acknowledgement-text">
            Okay, I will submit these mentioned documents.
          </span>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentDetailsModal;

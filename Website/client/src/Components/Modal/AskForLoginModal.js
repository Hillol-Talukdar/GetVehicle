import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AskForLoginModalConstants} from '../../Constants/CommonConstants';

const AskForLoginModal = ({ show, handleClose, startGoogleLoginProcess }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{AskForLoginModalConstants.HEADER}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{AskForLoginModalConstants.BODY}</p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-warning" to="/">
            Go To Home
          </Link>
          <Button variant="primary" onClick={startGoogleLoginProcess}>
            Google Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AskForLoginModal;

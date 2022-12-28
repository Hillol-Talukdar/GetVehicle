import React from 'react'
import { Modal } from 'react-bootstrap'
import CreateOrUpdateReviewForm from '../Forms/CreateOrUpdateReviewForm'

const UpdateReviewModal = ({
    id,
    show,
    handleClose,
    comment,
    submitHandler,
    changeHandler,
  }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Update Review</Modal.Title>
        </Modal.Header>

        <CreateOrUpdateReviewForm
          id={id}
          comment={comment}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          buttonName="Update"
        />
      </Modal>
    </>
  )
}

export default UpdateReviewModal
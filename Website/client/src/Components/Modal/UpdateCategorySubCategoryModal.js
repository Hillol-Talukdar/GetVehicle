import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateOrUpdateCategorySubCateogoryForm from '../Forms/CreateOrUpdateCategorySubCategoryForm';

const UpdateCategorySubCategoryModal = ({
  id,
  show,
  handleClose,
  name,
  submitHandler,
  changeHandler,
  buttonName,
  isCategory,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {isCategory === true ? (
            <Modal.Title>Update Category</Modal.Title>
          ) : (
            <Modal.Title>Update SubCategory</Modal.Title>
          )}
        </Modal.Header>

        <CreateOrUpdateCategorySubCateogoryForm
          id={id}
          name={name}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          buttonName={buttonName}
        />
      </Modal>
    </>
  );
};

export default UpdateCategorySubCategoryModal;

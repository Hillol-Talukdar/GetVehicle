import React from 'react';
import { Modal } from 'react-bootstrap';
import { CategoryInfoConstants, SubCategoryInfoConstants } from '../../Constants/CommonConstants';
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
            <Modal.Title>{CategoryInfoConstants.UPDATE_CATEGORY}</Modal.Title>
          ) : (
            <Modal.Title>{SubCategoryInfoConstants.UPDATE_SUB_CATEGORY}</Modal.Title>
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

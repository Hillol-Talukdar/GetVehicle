import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getACategory,
  getAllSubCategoriesOfACategory,
} from '../../../../../Services/CategoryDataService';
import CreateOrUpdateCategorySubCateogoryForm from '../../../../Forms/CreateOrUpdateCategorySubCategoryForm';
import UpdateCategorySubCategoryModal from '../../../../Modal/UpdateCategorySubCategoryModal';
import './CreateOrUpdateSubCategoryContainer.css';
import {
  ButtonConstants,
  SubCategoryInfoConstants,
} from '../../../../../Constants/CommonConstants';
import {
  createSubCategory,
  updateASubCategory,
  deleteASubCategory,
} from '../../../../../Services/SubCategoryDataService';
import { DELETE_CONFIRMATION } from '../../../../../Constants/AlertConstants';

export const CreateOrUpdateSubCategoryContainer = () => {
  const { categoryId } = useParams();
  const user = useSelector((state) => state.userReducer);
  const [name, setName] = useState('');
  const [modalName, setModalName] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    getACategory(categoryId).then((res) => setCategory(res.data.data));

    loadAllSubCategories();
  }, [categoryId]);

  const loadAllSubCategories = () =>
    getAllSubCategoriesOfACategory(categoryId).then((res) =>
      setSubCategories(res.data.data)
    );

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateModalShow = () => {
    setShowUpdateModal(true);
  };

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const modalChangeHandler = (e) => {
    setModalName(e.target.value);
  };

  const submitHandler = (e, id) => {
    e.preventDefault();

    setLoading(true);

    if (id === '') {
      createSubCategory({ name, category: `${category._id}` }, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.data.name}" is created!`);
          setName('');
          loadAllSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    } else {
      updateASubCategory(
        id,
        { name: `${modalName}`, category: `${category._id}` },
        user.token
      )
        .then((res) => {
          setLoading(false);
          handleUpdateModalClose();
          toast.success(`SubCategory is updated!`);
          setModalName('');
          loadAllSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    }
  };

  const handleDelete = async (e) => {
    if (window.confirm(DELETE_CONFIRMATION)) {
      setLoading(true);
      deleteASubCategory(e.target.value, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`SubCategory is Deleted!`);
          loadAllSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    }
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between border-bottom mb-3 border-2">
        {loading ? (
          <h4 className="ml-auto">
            {SubCategoryInfoConstants.CREATING_SUB_CATEGORY_OF}
            {category.name}...
          </h4>
        ) : (
          <h4 className="ml-auto">
            {SubCategoryInfoConstants.CREATE_NEW_SUB_CATEGORY_OF}
            {category.name}
          </h4>
        )}
      </div>

      <CreateOrUpdateCategorySubCateogoryForm
        id=""
        name={name}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        buttonName={ButtonConstants.CREATE_BUTTON}
      />

      <div className="d-flex justify-content-between border-bottom mb-3 border-2">
        <h4 className="ml-auto mt-3">
          {SubCategoryInfoConstants.ALL_SUB_CATEGORY_OF}
          {category.name}
        </h4>
      </div>

      <div className="d-flex flex-wrap justify-content-start">
        {subCategories.map((subCategory) => (
          <>
            <Card
              style={{ width: '15rem', margin: '8px' }}
              className="sub-category-card flex-fill"
            >
              <Button
                style={{ margin: '15px' }}
                variant="warning"
                size="sm"
                onClick={(e) => {
                  handleUpdateModalShow();
                  setModalName(subCategory.name);
                }}
              >
                Edit Sub-Category <BiEditAlt className="mb-1" />
              </Button>

              <Card.Body>
                <Card.Title>{subCategory.name}</Card.Title>
              </Card.Body>

              <Card.Body>
                <div className="d-flex justify-content-around">
                  <Button
                    onClick={handleDelete}
                    value={subCategory._id}
                    variant="danger"
                    size="sm"
                  >
                    <RiDeleteBin2Fill className="mb-1" />{' '}
                    {ButtonConstants.DELETE_BUTTON}
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <UpdateCategorySubCategoryModal
              id={subCategory._id}
              show={showUpdateModal}
              handleClose={handleUpdateModalClose}
              name={modalName}
              submitHandler={submitHandler}
              changeHandler={modalChangeHandler}
              buttonName={ButtonConstants.UPDATE_BUTTON}
              isCategory={false}
            />
          </>
        ))}
      </div>
    </Container>
  );
};

import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createCategory,
  deleteACategory,
  getAllCategories,
  updateACategory,
} from '../../../../../Services/CategoryDataService';
import CreateOrUpdateCategorySubCateogoryForm from '../../../../Forms/CreateOrUpdateCategorySubCategoryForm';
import UpdateCategorySubCategoryModal from '../../../../Modal/UpdateCategorySubCategoryModal';
import './CreateOrUpdateCategory.css';
import { ButtonConstants } from '../../../../../Constants/CommonConstants';

const CreateOrUpdateCategoryContainer = () => {
  const user = useSelector((state) => state.userReducer);
  const [name, setName] = useState('');
  const [modalName, setModalName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleUpdateModalShow = () => setShowUpdateModal(true);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () =>
    getAllCategories().then((res) => setCategories(res.data.data));

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
      createCategory({ name }, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.data.name}" is created!`);
          setName('');
          loadAllCategories();
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
      updateACategory(id, { name: `${modalName}` }, user.token)
        .then((res) => {
          setLoading(false);
          handleUpdateModalClose();
          toast.success(`Category is updated!`);
          setModalName('');
          loadAllCategories();
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
    if (window.confirm('Are you sure, you want to delete?')) {
      setLoading(true);
      deleteACategory(e.target.value, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`Category is Deleted!`);
          loadAllCategories();
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
          <h4 className="ml-auto">Createing Category...</h4>
        ) : (
          <h4 className="ml-auto">Create New Category</h4>
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
        <h4 className="ml-auto mt-3">All Categories</h4>
      </div>

      <div className="d-flex flex-wrap justify-content-start">
        {categories.map((category) => (
          <>
            <Card
              style={{ width: '15rem', margin: '8px' }}
              className="CategoryCard flex-fill"
            >
              <Button
                style={{ margin: '15px' }}
                variant="warning"
                size="sm"
                onClick={(e) => {
                  handleUpdateModalShow();
                  setModalName(category.name);
                }}
              >
                {ButtonConstants.EDIT_BUTTON} <BiEditAlt className="mb-1" />
              </Button>

              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
              </Card.Body>

              <Card.Body>
                <div className="d-flex justify-content-around">
                  <Link
                    to={`/category/${category._id}/create-or-update-category`}
                  >
                    <Button variant="outline-primary" size="sm">
                      <MdAdd className="mb-1" /> {ButtonConstants.ADD_BUTTON} SubCategory
                    </Button>
                  </Link>

                  <Button
                    onClick={handleDelete}
                    value={category._id}
                    variant="outline-danger"
                    size="sm"
                  >
                    <RiDeleteBin2Fill className="mb-1" /> {ButtonConstants.DELETE_BUTTON}
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <UpdateCategorySubCategoryModal
              id={category._id}
              show={showUpdateModal}
              handleClose={handleUpdateModalClose}
              name={modalName}
              submitHandler={submitHandler}
              changeHandler={modalChangeHandler}
              buttonName={ButtonConstants.UPDATE_BUTTON}
              isCategory={true}
            />
          </>
        ))}
      </div>
    </Container>
  );
};

export default CreateOrUpdateCategoryContainer;

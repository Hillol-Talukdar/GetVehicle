import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
    setModalName(e.target.value);
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure, you want to delete?')) {
      setLoading(true);
      deleteACategory(id, user.token)
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
        buttonName="Create"
      />

      <div className="d-flex justify-content-between border-bottom mb-3 border-2">
        <h4 className="ml-auto mt-3">All Categories</h4>
      </div>

      <div className="d-flex flex-wrap justify-content-start">
        {categories.map((category) => (
          <div
            className="alert CategoryCard d-flex justify-content-between m-3"
            style={{ width: '18rem' }}
            key={category._id}
          >
            <div>{category.name}</div>

            <div>
              <i
                class="fa-solid fa-pen px-3"
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={(e) => {
                  handleUpdateModalShow();
                  setModalName(category.name);
                }}
              ></i>
              <i
                class="fa-solid fa-trash"
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => handleDelete(category._id)}
              ></i>

              <i
                class="fa-solid fa-add"
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => handleDelete(category._id)}
              ></i>
            </div>

            <UpdateCategorySubCategoryModal
              id={category._id}
              show={showUpdateModal}
              handleClose={handleUpdateModalClose}
              name={modalName}
              submitHandler={submitHandler}
              changeHandler={modalChangeHandler}
              buttonName="Update"
              isCategory={true}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CreateOrUpdateCategoryContainer;

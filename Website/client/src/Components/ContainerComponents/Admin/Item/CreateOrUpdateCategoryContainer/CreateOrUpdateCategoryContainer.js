import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createCategory,
  deleteACategory,
  getAllCategories,
} from '../../../../../Services/CategoryDataService';
import CreateOrUpdateCategoryForm from '../../../../Forms/CreateOrUpdateCategoryForm';
import './CreateOrUpdateCategory.css';

const CreateOrUpdateCategoryContainer = () => {
  const user = useSelector((state) => state.userReducer);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () =>
    getAllCategories().then((res) => setCategories(res.data.data));

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

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

      <CreateOrUpdateCategoryForm
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
              ></i>
              <i
                class="fa-solid fa-trash"
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => handleDelete(category._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CreateOrUpdateCategoryContainer;

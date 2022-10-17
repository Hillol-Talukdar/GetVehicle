import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createCategory,
  getAllCategories,
} from '../../../../../Services/CategoryDataService';
import CreateOrUpdateCategoryForm from '../../../../Forms/CreateOrUpdateCategoryForm';

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

    createCategory(name, user.token)
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
    </Container>
  );
};

export default CreateOrUpdateCategoryContainer;

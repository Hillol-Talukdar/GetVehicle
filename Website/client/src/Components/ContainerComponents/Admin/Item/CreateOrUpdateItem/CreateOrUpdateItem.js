import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { VehicleInfoConstants } from '../../../../../Constants/CommonConstants';
import {
  getAllCategories,
  getAllSUbCategoriesOfACategory,
} from '../../../../../Services/CategoryDataService';
import { createVehicle } from '../../../../../Services/VehicleDataService';
import CreateOrUpdateItemForm from '../../../../Forms/CreateOrUpdateItemForm';

const initState = {
  model: '',
  categories: [],
  subCategories: [],
  subCategory: '',
  category: '',
  transmission: 'Manual',
  fuelType: 'None',
  engine: '',
  bootSpace: '',
  groundClearance: '',
  costPerDay: 0,
  seatCount: 1,
  mileage: 1,
  currentLocationString: '',
  bookingStatus: false,
  photo: [],
};

const CreateOrUpdateItemContainer = () => {
  const [values, setValues] = useState(initState);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () =>
    getAllCategories().then((cat) =>
      setValues({ ...values, categories: cat.data.data })
    );

  const categorySelectorHandler = (e) => {
    e.preventDefault();

    getAllSUbCategoriesOfACategory(e.target.value).then((res) => {
      setValues({ ...values, subCategories: res.data.data });
    });

    setShowSubCategory(true);
  };

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (e.target.name == VehicleInfoConstants.CATEGORY_IN_MODEL) {
      categorySelectorHandler(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createVehicle(values, user.token)
      .then((res) => {
        window.alert(`"${res.data.data.model}" is created!`);
        window.location.reload();
      })
      .catch((err) => {
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
        <h4 className="ml-auto">Create New Vehicle</h4>
      </div>

      <CreateOrUpdateItemForm
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        showSubCategory={showSubCategory}
        values={values}
        btnName="Create"
      />
    </Container>
  );
};

export default CreateOrUpdateItemContainer;

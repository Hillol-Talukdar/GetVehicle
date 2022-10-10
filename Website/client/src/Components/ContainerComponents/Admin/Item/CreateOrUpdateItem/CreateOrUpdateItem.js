import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCategories } from '../../../../../Services/CategoryDataService';
import { createVehicle } from '../../../../../Services/VehicleDataService';
import CreateOrUpdateItemForm from '../../../../Forms/CreateOrUpdateItemForm';

const initState = {
  model: '',
  categories: [],
  // subCategory: '',
  category: '',
  transmission: '',
  fuelType: '',
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
  const dispatch = useDispatch();
  const [values, setValues] = useState(initState);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () =>
    getAllCategories().then((cat) =>
      setValues({ ...values, categories: cat.data.data })
    );

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createVehicle(values, user.token)
      .then((res) => {
        window.alert(`"${res.data.model}" is created!`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(user.token);
        console.log(err.response.data.message);

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
        values={values}
        btnName="Create"
      />
    </Container>
  );
};

export default CreateOrUpdateItemContainer;

import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import FileResizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateOrUpdateConstants, VehicleInfoConstants } from '../../../../../Constants/CommonConstants';
import {
  getAllCategories,
  getAllSubCategoriesOfACategory,
} from '../../../../../Services/CategoryDataService';
import { createVehicle, updateAVehicle, uploadImagesOnCloudinary } from '../../../../../Services/VehicleDataService';
import CreateOrUpdateItemForm from '../../../../Forms/CreateOrUpdateItemForm';

const initState = {
  [VehicleInfoConstants.MODEL_IN_MODEL]: '',
  [VehicleInfoConstants.CATEGORIES]: [],
  [VehicleInfoConstants.SUB_CATEGORIES]: [],
  [VehicleInfoConstants.SUB_CATEGORY_IN_MODEL]: '',
  [VehicleInfoConstants.CATEGORY_IN_MODEL]: '',
  [VehicleInfoConstants.TRANSMISSON_IN_MODEL]: VehicleInfoConstants.MANUAL_TRANSMISSION_IN_MODEL,
  [VehicleInfoConstants.FUAL_TYPE_IN_MODEL]: VehicleInfoConstants.NONE_FUEL_TYPE_IN_MODEL,
  [VehicleInfoConstants.ENGINE_IN_MODEL]: '',
  [VehicleInfoConstants.BOOT_SPACE_IN_MODEL]: '',
  [VehicleInfoConstants.GROUND_CLEARANCE_IN_MODEL]: '',
  [VehicleInfoConstants.COST_PER_DAY_MODEL]: 0,
  [VehicleInfoConstants.SEAT_COUNT_IN_MODEL]: 1,
  [VehicleInfoConstants.COST_PER_DAY_MODEL]: 1,
  [VehicleInfoConstants.CURRENT_LOCATION_IN_MODEL]: '',
  [VehicleInfoConstants.BOOKING_STATUS_IN_MODEL]: false,
  [VehicleInfoConstants.PHOTO_IN_MODEL]: [],
};

const CreateOrUpdateItemContainer = () => {
  const location = useLocation();
  const currentItem = location.state || initState;
  const isUpdatingItem  = currentItem !== initState;
  const [values, setValues] = useState(currentItem);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () => {
    getAllCategories().then((cat) => {
      setValues({ ...values, categories: cat.data.data });
    });
  }

  const categorySelectorHandler = (e) => {
    e.preventDefault();

    getAllSubCategoriesOfACategory(e.target.value).then((res) => {
      setValues({ ...values, subCategories: res.data.data });
    });

    setShowSubCategory(true);
  };

  const resizeFile = (file) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  const changeHandler = (e) => {
    if(e.target.name === VehicleInfoConstants.PHOTO_IN_MODEL) {
      for(let i=0; i<e.target.files.length; i++) {
        resizeFile(e.target.files[i]).then((imageUri)=>{
          values[e.target.name].push(imageUri);
        }).catch((error) => {
          console.log(error.message);
        });
      } 
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    
    if (e.target.name === VehicleInfoConstants.CATEGORY_IN_MODEL) {
      values[e.target.name] = e.target.value;
      categorySelectorHandler(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if(values[VehicleInfoConstants.PHOTO_IN_MODEL]) {
      new Promise((resolve, reject) => {
        uploadImagesOnCloudinary(values[VehicleInfoConstants.PHOTO_IN_MODEL], resolve, reject);
      }).then((response) => {
        values[VehicleInfoConstants.PHOTO_IN_MODEL] = response;
        createOrUpdateVehicle();
      }).catch((error)=>{
        toast.error(error.message);
      });
    } else {
      createOrUpdateVehicle();
    }
  };

  const createOrUpdateVehicle = () => {
    if(isUpdatingItem) {
      updateVehicle();
    } else {
      createNewVehicle();
    }
  }

  const createNewVehicle = () => {
    createVehicle(values, user.token)
    .then((res) => {
      window.alert(`"${res.data.data.model}" has created successfully!`);
      window.location.replace("/");
    })
    .catch((err) => {
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    });
  }

  const updateVehicle = () => {
    updateAVehicle(values._id, values, user.token)
    .then((res) => {
      window.alert(`"${res.data.data.model}" has updated successfully!`);
      window.location.replace("/");
    })
    .catch((err) => {
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    });
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between mb-3 mt-2">
        <h4 className="m-auto">
          {isUpdatingItem ? CreateOrUpdateConstants.UPDATE_VEHICLE_TITLE : CreateOrUpdateConstants.CREATE_VEHICLE_TITLE}
        </h4>
      </div>

      <CreateOrUpdateItemForm
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        showSubCategory={showSubCategory}
        values={values}
        setValues={setValues}
        isUpdatingItem={isUpdatingItem}
        btnName={isUpdatingItem ? CreateOrUpdateConstants.UPDATE : CreateOrUpdateConstants.CREATE}
      />
    </Container>
  );
};

export default CreateOrUpdateItemContainer;

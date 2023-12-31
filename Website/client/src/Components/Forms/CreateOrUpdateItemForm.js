import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import {
  BookingStatus,
  FuelTypeStatus,
  TransmissionStatus,
  VehicleInfoConstants
} from '../../Constants/CommonConstants';
import { getAllSubCategoriesOfACategory } from '../../Services/CategoryDataService';
import "./CreateOrUpdateItemForm.css";

const CreateOrUpdateItemForm = ({
  submitHandler,
  changeHandler,
  showSubCategory,
  values,
  setValues,
  isUpdatingItem,
  btnName,
  isSubmitButtonEnabled,
}) => {
  const [images, setImages] = useState(values[VehicleInfoConstants.PHOTO_IN_MODEL] || []);

  if(isUpdatingItem) {
    getAllSubCategoriesOfACategory(values[VehicleInfoConstants.CATEGORY_IN_MODEL]._id).then((res) => {
      values[VehicleInfoConstants.SUB_CATEGORIES] = res.data.data;
    });
    showSubCategory = true;
  }

  const onChangePicture = e => {
    changeHandler(e);
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImages(oldImages => [...oldImages, reader.result]);

        });
        reader.readAsDataURL(e.target.files[i]);
      }
    }
  }

  const handleRemove = (image) => {
    let indexOfImage = images.indexOf(image);
    images.splice(indexOfImage, 1);
    values[VehicleInfoConstants.PHOTO_IN_MODEL] = images;
    setValues({ ...values, [VehicleInfoConstants.PHOTO_IN_MODEL]: images });
  }
  return (
    <Form onSubmit={submitHandler}>
      <div className="row justify-content-between text-left">
        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicModelName"
        >
          <Form.Label>
            {VehicleInfoConstants.MODEL}
            <span className="text-danger"> *</span>
          </Form.Label>

          <Form.Control
            type="Text"
            name={VehicleInfoConstants.MODEL_IN_MODEL}
            placeholder={VehicleInfoConstants.MODEL}
            value={values?.model}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicEngine"
        >
          <Form.Label>
            {VehicleInfoConstants.ENGINE}
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="Text"
            name={VehicleInfoConstants.ENGINE_IN_MODEL}
            placeholder={VehicleInfoConstants.ENGINE}
            value={values?.engine}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicBootSpace"
        >
          <Form.Label>
            {VehicleInfoConstants.BOOT_SPACE}
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="Text"
            name={VehicleInfoConstants.BOOT_SPACE_IN_MODEL}
            placeholder={VehicleInfoConstants.BOOT_SPACE}
            value={values?.bootSpace}
            onChange={changeHandler}
            required
          />
        </Form.Group>
      </div>

      <div className="row justify-content-between text-left">
        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasiCostPerDay"
        >
          <Form.Label>
            {VehicleInfoConstants.COST_PER_DAY}
            <span className="text-danger"> *</span>
          </Form.Label>

          <Form.Control
            type="Number"
            name={VehicleInfoConstants.COST_PER_DAY_MODEL}
            placeholder={0}
            min="0"
            value={values?.costPerDay}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicSeatCount"
        >
          <Form.Label>{VehicleInfoConstants.SEAT_COUNT}</Form.Label>
          <Form.Control
            type="Number"
            name={VehicleInfoConstants.SEAT_COUNT_IN_MODEL}
            placeholder={1}
            min="1"
            value={values?.seatCount}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicMileage"
        >
          <Form.Label>
            {VehicleInfoConstants.MILEAGE}
            <span className="text-danger"> *</span>
          </Form.Label>
          
          <Form.Control
            type="Number"
            name={VehicleInfoConstants.MILEAGE_IN_MODEL}
            placeholder={1}
            min="1"
            value={values?.mileage}
            onChange={changeHandler}
            required
          />
        </Form.Group>
      </div>

      <div className="row justify-content-between text-left">
        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicTransmission"
        >
          <Form.Label>{VehicleInfoConstants.TRANSMISSON}</Form.Label>

          <Form.Select
            name={VehicleInfoConstants.TRANSMISSON_IN_MODEL}
            onChange={changeHandler}
          >
            <option value={TransmissionStatus.MANUAL} selected={values[VehicleInfoConstants.TRANSMISSON_IN_MODEL] === TransmissionStatus.MANUAL}>
              {TransmissionStatus.MANUAL}
            </option>
            <option value={TransmissionStatus.AUTO} selected={values[VehicleInfoConstants.TRANSMISSON_IN_MODEL] === TransmissionStatus.AUTO}>
              {TransmissionStatus.AUTO}
            </option>
          </Form.Select>
        </Form.Group>

        {/* <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
          <Form.Label>{VehicleInfoConstants.BOOKING_STATUS}</Form.Label>

          <Form.Select name="bookingStatus" onChange={changeHandler}>
            <option value={false} selected={!values[VehicleInfoConstants.BOOKING_STATUS_IN_MODEL]}>
              {BookingStatus.UNRESERVED}
            </option>
            <option value={true} selected={values[VehicleInfoConstants.BOOKING_STATUS_IN_MODEL]}>
              {BookingStatus.RESERVED}
            </option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicFuelType"
        >
          <Form.Label>{VehicleInfoConstants.FUAL_TYPE}</Form.Label>

          <Form.Select
            name={VehicleInfoConstants.FUAL_TYPE_IN_MODEL}
            onChange={changeHandler}
          >
            <option value={FuelTypeStatus.NONE} selected={values[VehicleInfoConstants.FUAL_TYPE_IN_MODEL] === FuelTypeStatus.NONE}>
              {FuelTypeStatus.NONE}
            </option>
            <option value={FuelTypeStatus.PETROL} selected={values[VehicleInfoConstants.FUAL_TYPE_IN_MODEL] === FuelTypeStatus.PETROL}>
              {FuelTypeStatus.PETROL}
            </option>
            <option value={FuelTypeStatus.DIESEL} selected={values[VehicleInfoConstants.FUAL_TYPE_IN_MODEL] === FuelTypeStatus.DIESEL}>
              {FuelTypeStatus.DIESEL}
            </option>
            <option value={FuelTypeStatus.LPG} selected={values[VehicleInfoConstants.FUAL_TYPE_IN_MODEL] === FuelTypeStatus.LPG}>
              {FuelTypeStatus.LPG}
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicCurrentLocationString"
        >
          <Form.Label>
            {VehicleInfoConstants.CURRENT_LOCATION}
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="Text"
            name={VehicleInfoConstants.CURRENT_LOCATION_IN_MODEL}
            placeholder={VehicleInfoConstants.CURRENT_LOCATION}
            value={values?.currentLocationString}
            onChange={changeHandler}
          />
        </Form.Group>
      </div>

      <div className="row justify-content-between text-left">
        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicGroundClearance"
        >
          <Form.Label>{VehicleInfoConstants.GROUND_CLEARANCE}</Form.Label>
          <Form.Control
            type="Text"
            name={VehicleInfoConstants.GROUND_CLEARANCE_IN_MODEL}
            placeholder="Ground Clearance"
            value={values?.groundClearance}
            onChange={changeHandler}
          />
        </Form.Group>
        

        <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
          <Form.Label>{VehicleInfoConstants.CATEGORY}</Form.Label>

          <Form.Select
            name={VehicleInfoConstants.CATEGORY_IN_MODEL}
            onChange={changeHandler}
          >
            <option selected={values[VehicleInfoConstants.CATEGORY_IN_MODEL] === ''} disabled>
              Select {VehicleInfoConstants.CATEGORY}
            </option>

            {values?.categories?.length > 0 &&
              values?.categories?.map((cat) => (
                <option keys={cat._id} value={cat._id} selected={values[VehicleInfoConstants.CATEGORY_IN_MODEL]._id === cat._id}>
                  {cat.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
          {showSubCategory && (
            <>
              <Form.Label>{VehicleInfoConstants.SUB_CATEGORY}</Form.Label>

              <Form.Select
                name={VehicleInfoConstants.SUB_CATEGORY_IN_MODEL}
                onChange={changeHandler}
              >
                <option selected={values[VehicleInfoConstants.SUB_CATEGORY_IN_MODEL] === ''} disabled>
                  Select {VehicleInfoConstants.SUB_CATEGORY}
                </option>

                {values?.subCategories?.length > 0 &&
                  values?.subCategories?.map((subCat) => (
                    <option keys={subCat._id} value={subCat._id} selected={values[VehicleInfoConstants.SUB_CATEGORY_IN_MODEL] === subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
              </Form.Select>
            </>
          )}
        </Form.Group>
      </div>

      <Form.Group>
          <div className="row">
            {images &&
              images.map((image) => (


                <div className="mb-3 col-auto">
                    <div className="image-item-and-badge">
                        <span 
                          className="notify-badge"
                          onClick={() => handleRemove(image)}>
                            X
                        </span>
                        <Image src={image} width="60" height="60" alt="" />
                    </div>
                </div>
              ))}
          </div>
          <div className="row m-auto">
            <label className="btn btn-outline-primary">
              Choose and Upload File
              <input
                type="file"
                multiple
                accept="images/*"
                name={VehicleInfoConstants.PHOTO_IN_MODEL}
                hidden
                onChange={onChangePicture}
              />
            </label>
          </div>
        </Form.Group>

      <Button
        className="mx-auto mt-3 d-grid gap-2 col-5 mb-3"
        variant="primary"
        type="submit"
        disabled={!isSubmitButtonEnabled}
      >
        {btnName}
      </Button>
    </Form>
  );
};

export default CreateOrUpdateItemForm;

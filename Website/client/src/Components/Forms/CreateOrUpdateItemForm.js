import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Form } from 'react-bootstrap';
import {
  BookingStatus,
  fuelTypeStatus,
  TransmissionStatus,
  VehicleInfoConstants,
} from '../../Constants/CommonConstants';



const CreateOrUpdateItemForm = ({
  submitHandler,
  changeHandler,
  showSubCategory,
  values,
  btnName,
}) => {
  const [images, setImages] = useState([]);

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
  };
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
          <Form.Label>{VehicleInfoConstants.MILEAGE}</Form.Label>
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
            <option value={TransmissionStatus.MANUAL} selected>
              {TransmissionStatus.MANUAL}
            </option>
            <option value={TransmissionStatus.AUTO}>
              {TransmissionStatus.AUTO}
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
          <Form.Label>{VehicleInfoConstants.BOOKING_STATUS}</Form.Label>

          <Form.Select name="bookingStatus" onChange={changeHandler}>
            <option value={false} selected>
              {BookingStatus.UNRESERVED}
            </option>
            <option value={true}>{BookingStatus.RESERVED}</option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicFuelType"
        >
          <Form.Label>{VehicleInfoConstants.FUAL_TYPE}</Form.Label>

          <Form.Select
            name={VehicleInfoConstants.FUAL_TYPE_IN_MODEL}
            onChange={changeHandler}
          >
            <option value={fuelTypeStatus.NONE} selected>
              {fuelTypeStatus.NONE}
            </option>
            <option value={fuelTypeStatus.PETROL}>
              {fuelTypeStatus.PETROL}
            </option>
            <option value={fuelTypeStatus.DIESEL}>
              {fuelTypeStatus.DIESEL}
            </option>
            <option value={fuelTypeStatus.LPG}>{fuelTypeStatus.LPG}</option>
          </Form.Select>
        </Form.Group>
      </div>

      <div className="row justify-content-between text-left">
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
            <option selected disabled>
              Select {VehicleInfoConstants.CATEGORY}
            </option>

            {values?.categories?.length > 0 &&
              values?.categories?.map((cat) => (
                <option keys={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </div>

      <div className="row justify-content-between text-left mb-3">
        {showSubCategory && (
          <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
            <Form.Label>{VehicleInfoConstants.SUB_CATEGORY}</Form.Label>

            <Form.Select
              name={VehicleInfoConstants.SUB_CATEGORY_IN_MODEL}
              onChange={changeHandler}
            >
              <option selected disabled>
                Select {VehicleInfoConstants.SUB_CATEGORY}
              </option>

              {values?.subCategories?.length > 0 &&
                values?.subCategories?.map((subCategory) => (
                  <option keys={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        
        )}
      </div>

      <Form.Group>
          <div className="row">
            {images &&
              images.map((image) => (
                <div className="mb-3 col-auto">
                  
                    <Avatar
                      key={image}
                      src={image}
                      size={60}
                      shape="circle"
                    />
                  
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
      >
        {btnName}
      </Button>
    </Form>
  );
};

export default CreateOrUpdateItemForm;

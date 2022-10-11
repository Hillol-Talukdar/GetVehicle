import React from 'react';
import { Button, Form } from 'react-bootstrap';

const CreateOrUpdateItemForm = ({
  submitHandler,
  changeHandler,
  values,
  btnName,
}) => {
  // const {
  //   model,
  //   categories,
  //   subCategory,
  //   transmission,
  //   fuelType,
  //   engine,
  //   shipping,
  //   bootSpace,
  //   groundClearance,
  //   costPerDay,
  //   seatCount,
  //   mileage,
  //   currentLocation,
  //   bookingStatus,
  // } = values;

  return (
    <Form onSubmit={submitHandler}>
      <div className="row justify-content-between text-left">
        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicModelName"
        >
          <Form.Label>
            Model Name<span className="text-danger"> *</span>
          </Form.Label>

          <Form.Control
            type="Text"
            name="model"
            placeholder="Model Name"
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
            Engine<span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="Text"
            name="engine"
            placeholder="Engine Name"
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
            Boot Space<span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="Text"
            name="bootSpace"
            placeholder="Boot Space"
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
            Cost Per Day<span className="text-danger"> *</span>
          </Form.Label>

          <Form.Control
            type="Number"
            name="costPerDay"
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
          <Form.Label>Seat Count</Form.Label>
          <Form.Control
            type="Number"
            name="seatCount"
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
          <Form.Label>Mileage</Form.Label>
          <Form.Control
            type="Number"
            name="mileage"
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
          <Form.Label>Transmission</Form.Label>

          <Form.Select name="transmission" onChange={changeHandler}>
            <option value="Manual" selected>
              Manual
            </option>
            <option value="Auto">Auto</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
          <Form.Label>Booking Status</Form.Label>

          <Form.Select name="bookingStatus" onChange={changeHandler}>
            <option value={false} selected>
              False
            </option>
            <option value={true}>True</option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicFuelType"
        >
          <Form.Label>Fuel Type</Form.Label>

          <Form.Select name="fuelType" onChange={changeHandler}>
            <option value="None" selected>
              None
            </option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="LPG">LPG</option>
          </Form.Select>
        </Form.Group>
      </div>

      <div className="row justify-content-between text-left">
        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicCurrentLocationString"
        >
          <Form.Label>
            Current Location<span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="Text"
            name="currentLocationString"
            placeholder="Current Location"
            value={values?.currentLocationString}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group
          className="form-group col-sm-4 flex-column d-flex mb-3"
          controlId="formBasicGroundClearance"
        >
          <Form.Label>Ground Clearance</Form.Label>
          <Form.Control
            type="Text"
            name="groundClearance"
            placeholder="Ground Clearance"
            value={values?.groundClearance}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="form-group col-sm-4 flex-column d-flex mb-3">
          <Form.Label>Category</Form.Label>

          <Form.Select name="category" onChange={changeHandler}>
            <option selected disabled>
              Select Category
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

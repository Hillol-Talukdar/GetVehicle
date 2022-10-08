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
          <Form.Label>Engine</Form.Label>
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
          <Form.Label>Boot Space</Form.Label>
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

      <Button variant="primary" type="submit">
        {btnName}
      </Button>
    </Form>
  );
};

export default CreateOrUpdateItemForm;

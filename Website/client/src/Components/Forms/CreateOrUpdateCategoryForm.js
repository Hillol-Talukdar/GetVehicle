import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { CategoryInfoConstants, VehicleInfoConstants } from '../../Constants/CommonConstants';

const CreateOrUpdateCategoryForm = ({
  name,
  submitHandler,
  changeHandler,
  buttonName,
}) => {
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group
        className="form-group d-flex align-items-center col-sm-4 flex-column mx-auto mb-3"
        controlId="formBasicCategoryName"
      >
        <Form.Label>
          {CategoryInfoConstants.NAME}
          <span className="text-danger"> *</span>
        </Form.Label>

        <Form.Control
          type="Text"
          name={CategoryInfoConstants.NAME_IN_MODEL}
          placeholder={CategoryInfoConstants.NAME}
          value={name}
          onChange={changeHandler}
          required
        />
      </Form.Group>

      <Button
        className="mx-auto mt-3 d-grid gap-2 col-sm-4 mb-3"
        variant="primary"
        type="submit"
      >
        {buttonName}
      </Button>
    </Form>
  );
};

export default CreateOrUpdateCategoryForm;

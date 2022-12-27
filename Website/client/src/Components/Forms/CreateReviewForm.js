import React from 'react'
import { Button, Form } from 'react-bootstrap';

const CreateReviewForm = ({
    comment,
    submitHandler,
    changeHandler,
    buttonName,
  }) => {
  return (
    <Form onSubmit={e=> submitHandler(e)}>
      <Form.Group
        className="form-group d-flex align-items-center col-sm-4 flex-column mx-auto mb-3"
        controlId="formBasicCategoryName"
      >
        <Form.Label>
          Enter your Review...
        </Form.Label>

        <Form.Control
          type="Text"
          name="comment"
          placeholder="Enter your review"
          value={comment}
          onChange={changeHandler}
          required
        />
      </Form.Group>

      <Button
        className="mx-auto mt-3 d-grid gap-2 col-sm-1 mb-3"
        variant="primary"
        type="submit"
      >
        {buttonName}
      </Button>
    </Form>
  )
}

export default CreateReviewForm
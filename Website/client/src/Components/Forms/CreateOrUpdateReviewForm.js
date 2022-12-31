import React from 'react'
import { Button, Form } from 'react-bootstrap';

const CreateOrUpdateReviewForm = ({
    id,
    comment,
    submitHandler,
    changeHandler,
    buttonName,
  }) => {
  return (
    <Form onSubmit={e=> submitHandler(e, id)} style={{background: "#fad209", padding: "15px"}}>
      <Form.Group
        className="form-group d-flex align-items-center"
        controlId="formBasicCategoryName"
      >
        <Form.Control
          as="textarea"
          name="comment"
          placeholder="Enter your review here"
          style={{ height: '120px' }}
          value={comment}
          onChange={changeHandler}
          required
        />
      </Form.Group>

      <Button
        className="d-grid gap-2"
        style={{marginLeft: "auto", marginTop: "12px"}}
        variant="secondary"
        type="submit"
      >
        {buttonName}
      </Button>
    </Form>
  )
}

export default CreateOrUpdateReviewForm
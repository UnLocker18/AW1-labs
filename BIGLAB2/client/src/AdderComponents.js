import { Modal, Form, Col, ListGroup, Button } from 'react-bootstrap';
import {
  PlusCircleFill,
  Check,
  X,
  Clock,
  Calendar,
} from 'react-bootstrap-icons';

import TimeField from 'react-simple-timefield';

function TaskAdder(props) {
  const { show, handleShow, handleClose, clearForm, ...propsObj } = props;

  return (
    <>
      <PlusCircleFill
        color="#17a2b8"
        size={64}
        onClick={handleShow}
        className="cursor-pointer hover-scaleup"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <TaskForm {...propsObj} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link" className="text-dark" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="info" onClick={props.handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function TaskForm(props) {
  const formDescription = (
    <Form.Control
      type="text"
      placeholder="Enter a description for your task"
      onChange={ev => props.handleDescChange(ev)}
      isInvalid={!props.validated ? false : !props.description.isValid}
      isValid={!props.validated ? false : props.description.isValid}
      value={props.description.value}
    />
  );

  const formImportant = (
    <Form.Check
      custom
      type="checkbox"
      id="form-checkbox-1"
      label="Important"
      onChange={ev => props.setIsImportant(ev.target.checked)}
      checked={props.isImportant}
    />
  );

  const formPrivate = (
    <Form.Check
      custom
      type="checkbox"
      id="form-checkbox-2"
      label="Private"
      className="mr-3"
      onChange={ev => props.setIsPrivate(ev.target.checked)}
      checked={props.isPrivate}
    />
  );

  const formDeadline = (
    <Form.Control
      type="date"
      onChange={ev => props.handleDateChange(ev, -1)}
      isInvalid={!props.validated ? false : !props.date.isValid}
      isValid={!props.validated ? false : props.date.isValid}
      value={props.date.value}
    />
  );

  const formTimeField = (
    <TimeField
      value={props.time}
      onChange={(ev, value) => props.handleTimeChange(ev, value)}
      input={<Form.Control className="max-width-5" />}
    />
  );

  return props.editMode < 0 ? (
    <Form noValidate onSubmit={props.handleSubmit}>
      <Form.Group controlId="formDescription">
        <Form.Label>Task description</Form.Label>
        {formDescription}
        <Form.Control.Feedback type="invalid">
          Please add a description.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex py-2" controlId="formCheckboxes">
        {formPrivate} {formImportant}
      </Form.Group>
      <Form.Label>Deadline</Form.Label>
      <Form.Group className="d-lg-flex mb-0">
        <Col
          lg={8}
          className="d-flex align-items-center p-0 pr-lg-3 mb-2 mb-lg-0"
        >
          <Calendar className="mr-2" />
          {formDeadline}
        </Col>
        <CustomFeedback
          validated={props.validated}
          breakpoint={!props.lg}
          isValid={props.date.isValid}
        >
          Deadline should be after current time.
        </CustomFeedback>
        <Col lg={4} className="d-flex align-items-center p-0 mt-3 mt-lg-0">
          <Clock className="mr-2" />
          {formTimeField}
        </Col>
      </Form.Group>
      <CustomFeedback
        validated={props.validated}
        breakpoint={props.lg}
        isValid={props.date.isValid}
      >
        Deadline should be after current time.
      </CustomFeedback>
    </Form>
  ) : (
    <ListGroup.Item className="edit-animation">
      <Form
        noValidate
        onSubmit={props.handleSubmit}
        className="d-flex align-items-center flex-column flex-md-row"
      >
        <Col lg={4} as="span" className="">
          {formDescription}
        </Col>
        <Col
          lg={3}
          as="span"
          className="d-flex justify-content-center my-3 my-lg-0"
        >
          {formPrivate} {formImportant}
        </Col>
        <Col
          lg={5}
          as="span"
          className="d-flex justify-content-end align-items-center"
        >
          <Form.Control
            className="mr-3"
            type="date"
            onChange={ev => props.handleDateChange(ev, props.tskID)}
            isInvalid={!props.validated ? false : !props.date.isValid}
            isValid={!props.validated ? false : props.date.isValid}
            value={props.date.value}
          />
          {formTimeField}
          <div className="d-flex align-items-center ml-3">
            <X
              size={32}
              className="hover-scaleup cursor-pointer"
              onClick={() => props.editTask(-1)}
            />
            <Check
              size={40}
              color="#17a2b8"
              className="hover-scaleup cursor-pointer"
              onClick={props.handleSubmit}
            />
          </div>
        </Col>
      </Form>
    </ListGroup.Item>
  );
}

function CustomFeedback(props) {
  //rendere più robusto il componente (gestire props.children e props.breakpoint)
  return (
    <div
      className={
        'margin-l-14 custom-invalid-feedback ' +
        (!props.validated
          ? false
          : props.breakpoint && !props.isValid && 'custom-is-invalid')
      }
    >
      {props.children}
    </div>
  );
}

export { TaskAdder, TaskForm };

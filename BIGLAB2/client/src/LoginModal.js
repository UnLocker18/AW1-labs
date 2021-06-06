import React, { useState } from 'react';
import validator from 'validator';

import { Form, Modal, Button, Alert } from 'react-bootstrap';

function LoginModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const credentials = { username: email, password: password };
    if (validEmail && validPwd) props.logIn(credentials);
  };

  const validateEmail = email => {
    if (validator.isEmail(email)) setValidEmail(true);
    else setValidEmail(false);
  };
  const validatePwd = pwd => {
    if (validator.isLength(pwd, { min: 8, max: 30 })) setValidPwd(true);
    else setValidPwd(false);
  };

  return (
    <Modal show={true} backdrop="static">
      <Modal.Header>
        <Modal.Title>Please Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.message.status === 'danger' && (
          <>
            <Alert
              variant={props.message.status}
              onClose={() => props.setMessage('')}
              dismissible
            >
              {props.message.details}
            </Alert>
          </>
        )}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@email.com"
              required
              onChange={e => {
                validateEmail(e.target.value);
                setEmail(e.target.value);
              }}
              isInvalid={!validEmail}
              value={email}
            />
            <Form.Control.Feedback type="invalid">
              Invalid Email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={e => {
                validatePwd(e.target.value);
                setPassword(e.target.value);
              }}
              isInvalid={!validPwd}
              value={password}
            />
            <Form.Control.Feedback type="invalid">
              Invalid Password
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={handleSubmit}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;

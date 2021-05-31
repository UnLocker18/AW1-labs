/* import { Row, Form, Col, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

const LoginForm = (props) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleLogin = (event) =>{
        event.preventDefault();
        setErrors("");
        const credentials = { username, password };
        //validations
        let valid=true;
        if( username === "" || password === "") valid = false;
        if(valid){
            props.loginApp(credentials);
        }
        else{
            setErrors("Form field not valid");
        }
        
    }

    return <>
    <Form className="py-5 px-5 " >
        {errors ? <Alert variant='danger'>{errors}</Alert> : ''}
        <Col  lg={8} className="py-3" ><h2>Login Form</h2></Col>
        <Form.Group as={Row} controlId="username">
            <Form.Label column lg={3}>
                Email
            </Form.Label>
            <Col lg={9}>
                <Form.Control type="email" placeholder="Username" 
                              value={username} onChange={ev => setUsername(ev.target.value) }/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="password">
            <Form.Label column lg={3}>
                Password
            </Form.Label>
            <Col lg={9}>
                <Form.Control type="password" placeholder="Password" 
                              value={password} onChange={ev => setPassword(ev.target.value) }/>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Col className="text-center">
                <Button variant="info" onClick={handleLogin} >Login</Button>
            </Col>
         </Form.Group>
    </Form>
    </>;
}

export default LoginForm; */

import React, { useState } from 'react';
import validator from 'validator';

import { Form, Modal, Button } from 'react-bootstrap';

function LoginModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const credentials = { email, password };
    if (validEmail && validPwd) props.logIn(credentials);
  };

  const validateEmail = email => {
    if (validator.isEmail(email)) setValidEmail(true);
    else setValidEmail(false);
  };
  const validatePwd = pwd => {
    if ( validator.isLength(pwd, {min: 8, max: 30}) ) setValidPwd(true);
    else setValidPwd(false);
  };

  return (
    <Modal show={true} backdrop="static">
      <Modal.Header>
        <Modal.Title>Please Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

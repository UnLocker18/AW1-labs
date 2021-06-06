import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Main from './Main';
import FilterList from './FilterComponents';
import MainNav from './MainNav';
import { useViewport } from './utils';
import LoginModal from './LoginModal';
import API from './API';

import { Container, Col, Collapse } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

function App() {
  const [open, setOpen] = useState(true);

  const [logged, setLogged] = useState(false);
  const [justLogged, setJustLogged] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      API.isUserLogged().then(user => {
        if (user) setLogged(true);
      });
    };
    checkAuth();
  }, []);

  async function loginApp(credentials) {
    try {
      const username = await API.loginUser(credentials);
      setLogged(true);
      setJustLogged(true);
      setMessage({ status: 'success', details: `Welcome ${username}` });
    } catch (err) {
      setMessage({
        status: 'danger',
        details: 'Wrong username and/or password',
      });
    }
  }

  async function logoutApp() {
    await API.logoutUser();
    setLogged(false);
  }

  return (
    <Router>
      <Container fluid className="d-flex flex-column height-100 m-0 p-0">
        <MainNav
          logOut={logoutApp}
          toggleCollapse={isOpen => setOpen(isOpen)}
        />

        <Content
          logged={logged}
          justLogged={justLogged}
          setJustLogged={setJustLogged}
          message={message}
          loginApp={loginApp}
          isOpen={open}
        />
      </Container>
    </Router>
  );
}

function Content(props) {
  const { width } = useViewport();
  const breakpoint = 992;

  const lg = width > breakpoint;

  return (
    <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
      {props.logged && <Aside lg={lg} isOpen={props.isOpen} />}
      <Switch>
        <Route
          exact
          path="/login"
          render={() =>
            props.logged ? (
              <Redirect to="/all" />
            ) : (
              <LoginModal
                logIn={props.loginApp}
                logOut={props.logoutApp}
                message={props.message}
                setMessage={props.setMessage}
              />
            )
          }
        />
        <Route
          exact
          path="/:url"
          render={({ match }) =>
            props.logged ? (
              <Main
                lg={lg}
                selectedFilter={match.params.url}
                message={props.message}
                logged={props.logged}
                justLogged={props.justLogged}
                setJustLogged={props.setJustLogged}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/"
          render={() =>
            props.logged ? <Redirect to="/all" /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </Container>
  );
}

function Aside(props) {
  return (
    <Collapse in={props.isOpen}>
      <Col
        as="aside"
        lg={4}
        xs={12}
        className={props.lg ? 'show bg-light py-3' : 'bg-light py-3'}
      >
        <FilterList id="filter-list" />
      </Col>
    </Collapse>
  );
}

export default App;

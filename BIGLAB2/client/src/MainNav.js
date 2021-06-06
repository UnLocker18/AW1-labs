import { Navbar, Form, FormControl, Button, Container } from 'react-bootstrap';

import { Check2All, List, BoxArrowLeft } from 'react-bootstrap-icons';

import { NavLink } from 'react-router-dom';

function Toggle(props) {
  return (
    <Button
      onClick={() => props.toggleCollapse(wasOpen => !wasOpen)}
      variant="link"
      className="d-lg-none"
    >
      <List color="white" size={32} />
    </Button>
  );
}

function MainNav(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid className="my-1 mx-auto">
        <Toggle {...props} />
        <Navbar.Brand
          className="d-flex align-items-center justify-content-between"
          href="#home"
        >
          <Check2All color="white" size={36} className="mr-2" />
          <h4>ToDO Manager</h4>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Form inline className="mx-auto">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar.Collapse>
        {/* <PersonCircle color="white" size={32} /> */}
        <NavLink
          to="/login"
          onClick={() => props.logOut()}
          className="text-white d-flex align-items-center"
        >
          {/* <span>Logout</span> */}
          <BoxArrowLeft size={24} className="hover-white" />
        </NavLink>
      </Container>
    </Navbar>
  );
}

export default MainNav;

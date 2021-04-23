import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import PersonCircle from 'react-bootstrap-icons/dist/icons/person-circle';
import Check2All from 'react-bootstrap-icons/dist/icons/check2-all';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

function MainNav(props) {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid className="my-1">
                <Navbar.Toggle aria-controls = "responsive-navbar-nav"
                    onClick = {() => props.toggleMenu()}
                />
                <Navbar.Brand className="d-flex align-items-center" href="#home">
                    <Check2All color="white" size={36} className="mr-2" />
                    <h4>ToDO Manager</h4>
                </Navbar.Brand>
                <Form inline className="mx-auto navbar_form">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                <PersonCircle color="white" size={32} />
            </Container>
        </Navbar>
    );
}

export default MainNav;

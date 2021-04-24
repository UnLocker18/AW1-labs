import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import PersonCircle from 'react-bootstrap-icons/dist/icons/person-circle';
import Check2All from 'react-bootstrap-icons/dist/icons/check2-all';

function MainNav() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid className="my-1 mx-auto">
                <Navbar.Toggle aria-controls="" />
                <Navbar.Brand className="d-flex align-items-center justify-content-between" href="#home">
                    <Check2All color="white" size={36} className="mr-2" />
                    <h4>ToDO Manager</h4>
                </Navbar.Brand>
                <Form inline className="collapse d-lg-block mx-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                {/* <Navbar.Collapse>
                    
                </Navbar.Collapse> */}
                <PersonCircle color="white" size={32} />
            </Container>
        </Navbar>
    );
}

export default MainNav;
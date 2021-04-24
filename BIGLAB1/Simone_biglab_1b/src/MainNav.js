import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import PersonCircle from 'react-bootstrap-icons/dist/icons/person-circle';
import Check2All from 'react-bootstrap-icons/dist/icons/check2-all';
import List from 'react-bootstrap-icons/dist/icons/list'

function MainNav(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid className="my-1">
                <Navbar.Brand className="d-flex align-items-center" href="#home">
                    <Button variant="outline-light" className="mr-2" onClick={ () => props.toggleFilter() }>
                        <List color="white" size={36} />
                    </Button>
                    <Check2All color="white" size={36} className="mr-2" />
                    <h4>ToDO Manager</h4>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Form inline className="mx-auto">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar.Collapse>
                <PersonCircle color="white" size={32} />
            </Container>
        </Navbar>
    );
}

export default MainNav;
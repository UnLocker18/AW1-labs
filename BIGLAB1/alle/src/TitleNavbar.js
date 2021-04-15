import 'bootstrap/dist/css/bootstrap.css';
import {
    FormControl,
    Navbar, 
    Form,
} from 'react-bootstrap';
import { 
    PatchCheck,
    PersonCircle,
} from 'react-bootstrap-icons';

function TitleNavbar() {
    return(
        <Navbar bg="success" variant="dark" expand="md"className="d-flex justify-content-between">
            <Navbar.Toggle aria-controls="filters" />
            <Navbar.Brand href="#home">
                <PatchCheck className="mb-0" size={32}/> Task Manager
            </Navbar.Brand>
            <Navbar.Collapse className="col-4">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
            </Navbar.Collapse>
            <Navbar.Text>
                <a href="#" className="text-white-50"><PersonCircle size={32}/></a> 
            </Navbar.Text>
        </Navbar>
    );
}

export default TitleNavbar
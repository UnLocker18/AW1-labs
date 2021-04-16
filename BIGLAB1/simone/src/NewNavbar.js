import {Nav} from 'react-bootstrap'
import {Navbar} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Receipt} from 'react-bootstrap-icons'
import {Person} from 'react-bootstrap-icons'

import './App.css'

function NewNavbar(props)
{
    return (
        <Navbar className="d-flex justify-content-between bg_green">
            <Navbar.Brand href="#home">
                <Button type="button" variant="success">
                    <Receipt className="size_2 c_white" />ToDo Manager
                </Button>
            </Navbar.Brand>
        
            <Form inline>
                <Form.Control type="text" placeholder="Search" />
                <Button type="button" variant="outline-success">Search</Button>
            </Form>

            <Nav>
                <Button type="button" variant="success">
                    <Person className="size_2 c_white"></Person>
                </Button>
            </Nav>
        </Navbar>
    );
}

export default NewNavbar;
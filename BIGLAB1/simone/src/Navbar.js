import {Nav} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Receipt} from 'react-bootstrap-icons'
import {Person} from 'react-bootstrap-icons'

import './App.css'

function MyNavbar(props)
{
    return (
        <Nav className="justify-content-between navbar navbar-expand-lg navbar-light bg_green">
            <Nav.Item as="div">
                <Button type="button" variant="success">
                    <Receipt className="size_2 c_white">ToDoManager</Receipt>
                </Button>
            </Nav.Item>
            <Nav.Item as="div" className="d-flex">
                <Form>
                    <Form.Control type="text" placeholder="Search" />
                </Form>
                <Button type="button" variant="outline-success">Search</Button>
            </Nav.Item>
            <Nav.Item as="div">
                <Button type="button" variant="success">
                    <Person className="size_2 c_white"></Person>
                </Button>
            </Nav.Item>
        </Nav>
    );
}

export default MyNavbar;
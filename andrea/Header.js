import {Navbar} from "react-bootstrap"
import { CheckAll } from 'react-bootstrap-icons';
import {Form} from "react-bootstrap"
import {FormControl} from "react-bootstrap"
import {PersonCircle} from "react-bootstrap-icons"

const Header = (props) => {
    return(
        <Navbar className="d-flex justify-content-between" expand="sm" bg="success" variant="dark">
            <Navbar.Brand> 
                <CheckAll size={36}/>
                ToDo Manager
            </Navbar.Brand>
            <Form inline>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
            </Form>
            <PersonCircle color="white" size={36}/>
        </Navbar>
    )
}

export default Header
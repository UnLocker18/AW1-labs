import 'bootstrap/dist/css/bootstrap.css';
import {
    Nav,
} from 'react-bootstrap';

function FilterMenu(props) {
    return(
        <Nav variant="pills" className="flex-md-column" defaultActiveKey="filter-All">
            {props.filters.map(
                name => (
                    <Nav.Item as="li">
                        <Filter eventKey={`filter-${name}`} text={name} key={`filter-${name}`} />
                    </Nav.Item>
                )
            )}
        </Nav>
    );
}

function Filter(props) {
    const href = '/' + props.text;
    return(
        <Nav.Link eventKey={props.eventKey} className="rounded-0 border-top text-dark">{props.text}</Nav.Link>
    );
}

export default FilterMenu;
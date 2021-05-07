import { Nav } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import {filters} from './data';

function Filter(props) {
    return (
        <NavLink className="nav-link rounded-0 border-top text-dark hover-bg-light"
            to={{pathname: "/filter/" + props.id, state: {activeFilter: props.id}}}
        >
            {props.text}
        </NavLink>
        /* <Nav.Link className="nav-link rounded-0 border-top text-dark hover-bg-light"
                to={"/filter/" + props.id}
                eventKey={props.id}
                onSelect={() => props.chooseFilter(props.id)}>
                {props.text}
            </Nav.Link> */
    );
}

function FilterList() {
    const filterList = filters.map( filter => <Filter key={filter.id} {...filter} />)
    return (
        <Nav variant="pills" className="flex-column" defaultActiveKey="1" id="filter-list">
            {filterList}
        </Nav>
    );
}

/* function Filter(props) {
    return <ListGroup.Item className={props.active && "bg-info border-info"} active={props.active}>{props.text}</ListGroup.Item>;
}

function FilterList() {
    const filterList = filters.map( filter => <Filter key={filter.id} {...filter}/>)
    return (
        <ListGroup className="rounded-0">
            {filterList}
        </ListGroup>
    );
} */

export default FilterList;
import Nav from 'react-bootstrap/Nav';

import {filters} from './data';

function Filter(props) {
    return (
        <Nav.Link 
            className="rounded-0 border-top text-dark hover-bg-light" 
            eventKey={props.id}
            onSelect={() => props.chooseFilter(props.id)}
        >{props.text}</Nav.Link>
    );
}

function FilterList(props) {
    const filterList = filters.map( filter => <Filter key={filter.id} chooseFilter={props.chooseFilter} {...filter} />)
    return (
        <Nav variant="pills" className="flex-column" defaultActiveKey="1" chooseFilter={props.chooseFilter} id="filter-list">
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
import ListGroup from 'react-bootstrap/ListGroup';

import {filters} from './data';

function Filter(props) {
    return <ListGroup.Item className={props.active && "bg-info border-info"} active={props.active}>{props.text}</ListGroup.Item>;
}

function FilterList() {
    const filterList = filters.map( filter => <Filter key={filter.id} {...filter}/>)
    return (
        <ListGroup className="rounded-0">
            {filterList}
        </ListGroup>
    );
}

export default FilterList;
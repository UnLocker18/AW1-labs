import ListGroup from 'react-bootstrap/ListGroup';

import { filters } from './data';

import { useState } from 'react';

function Filter(props) {
    return <ListGroup.Item className={(props.active && "bg-info border-info") + " hover-bg-light cursor-pointer z-index-max"} 
        active={props.active} onClick={() => props.setActiveFilter(props.id)}>{props.text}</ListGroup.Item>;
}

function FilterList(props) {
    const filterList = filters.map( (filter, index) => {
        return <Filter key={index} id={index} active={props.activeFilter === index ? true : false} 
            setActiveFilter={props.setActiveFilter} text={filter}/>;
    });

    return (
        <ListGroup className="rounded-0">
            {filterList}
        </ListGroup>
    );
}

export default FilterList;
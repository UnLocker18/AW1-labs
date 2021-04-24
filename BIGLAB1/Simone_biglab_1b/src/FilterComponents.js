import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse'

function Filter(props) {
    return <ListGroup.Item className={props.filter.active && "bg-info border-info"} 
            onClick={ () => props.choose(props.id)}>{props.filter.text}</ListGroup.Item>;
}

function FilterList(props) {

    props.filters.forEach( el =>{
        if(el.id === props.selected) el.active = true;
        else el.active = false;
    })
    const filterList = [...props.filters].map( (filter) => <Filter key={filter.id} filter={filter}
                                                                    id={filter.id} choose={props.chooseFilter}/>)
    return (
        <Collapse in={props.open}>
            <ListGroup className="rounded-0" variant="flush">           
                {filterList} 
            </ListGroup>
        </Collapse>
    );
}

export default FilterList;
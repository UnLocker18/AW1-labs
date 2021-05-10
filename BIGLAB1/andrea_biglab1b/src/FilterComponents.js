import ListGroup from 'react-bootstrap/ListGroup';

function Filter(props) {
    //props.chooseFlter()
    //className={props.active && "bg-info border-info"} active={props.active}
    //console.log(props.id)
    return(
        <ListGroup.Item  onClick={() => props.choose(props.id)} className={props.active && "bg-info border-info"}>
            {props.text}
        </ListGroup.Item>
    )
}

function FilterList(props) {

    return(
        <ListGroup className="rounded-0">
        {
            props.list.map( filter => 
                <Filter text={filter.text} key={filter.id} id={filter.id} active={filter.id === props.selected} choose={props.choose} />
            )
        }
        </ListGroup>
    )
}

export default FilterList;
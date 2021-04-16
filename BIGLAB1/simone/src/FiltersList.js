import {Button} from 'react-bootstrap'

let id=0;

function FiltersList(props) 
{
    const list=props.filterList;
    const listItems = list.map( (el) => {
        if (el==="All")
            return <Button type="button" variant="success" className="list-group-item list-group-item-action" aria-current="true" key={id++}id={el} >{el}</Button>
        else
            return  <Button type="button" variant="success" className="list-group-item list-group-item-action" key={id++}id={el} >{el}</Button>
    }     
    );
    return ( <div className="list-group list-group-flush" id="filters">{listItems}</div> );
}

export default FiltersList;
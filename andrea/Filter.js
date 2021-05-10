const Filter = (props) => {
    if(props.active){
        return <li className="list-group-item active bg-success border-0">{props.title}</li>   
    }
    else{
        return <li className="list-group-item">{props.title}</li>
    }
}

export default Filter
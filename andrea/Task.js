import {PersonSquare} from "react-bootstrap-icons"

const Task = (props) => {
    return (
        <li className="d-flex justify-content-between align-items-center task list-group-item">
            <div>
                <input className="mr-2"type="checkbox" id="first"/>
               {props.isImportant ?  <label className="m-0 text-danger" htmlFor="first">{props.title}</label> : <label className="m-0" htmlFor="first">{props.title}</label> }
            </div>
            {props.isPrivate && <PersonSquare size={20}/>}
            <p className="m-0">{props.date}</p>
        </li>
    )
}

export default Task
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

import PersonSquare from 'react-bootstrap-icons/dist/icons/person-square';
import ThreeDotsVertical from 'react-bootstrap-icons/dist/icons/three-dots-vertical';
import Trash2Fill from 'react-bootstrap-icons/dist/icons/trash2-fill';
import PencilSquare from 'react-bootstrap-icons/dist/icons/pencil-square';

import React, {useState} from 'react';

import dayjs from "dayjs"
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isToday)
dayjs.extend(isBetween)

function Task(props) {

    return (
        <ListGroup.Item className="d-flex align-items-center">
            <Col as="span" className={props.isUrgent && "text-danger"}>
                <Form.Check
                    custom
                    type="checkbox"
                    id={"custom-checkbox-" + props.id}
                    label={props.description}
                />
            </Col>
            <Col as="span" className="text-dark text-center">{props.isPrivate && <PersonSquare />}</Col>
            <Col as="span" className="font-075 text-right">{props.date.format("DD-MM-YYYY")}<TaskControls id = {props.id} deleteTask ={props.deleteTask}/></Col>
        </ListGroup.Item>
    );
}

function TaskControls(props) {
 
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled m-0">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );
    return (
        <Dropdown className="d-inline ml-2">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <ThreeDotsVertical color="" size={18} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="min-width-5" as={CustomMenu}>
                <Dropdown.Item className="px-3" href="#/action-1"><PencilSquare className="mr-3" size={16}/>Edit</Dropdown.Item>
                <Dropdown.Item as="button" className="px-3" href="#/action-2"
                    onClick = { () => props.deleteTask(props.id)}>
                    <Trash2Fill className="mr-3" size={16}/>
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function TaskList(props) {
    
    let taskList = []

    switch(props.filter){
        case 1:
            taskList = props.list
            break;
        case 2:
            taskList = props.list.filter(task => task.isUrgent === true)
            break;
        case 3:
            taskList = props.list.filter(task => task.date.isToday())
            break
        case 4:
            taskList = props.list.filter(task => task.date.isBetween(dayjs(), dayjs().add(7, "day"), null, "(]"))
            break
        case 5:
            taskList = props.list.filter(task => task.isPrivate === true)
            break;
    }

    taskList = taskList.map(task => <Task key={task.id} deleteTask ={props.deleteTask} {...task} />);

    return (
        <ListGroup variant="flush" className="margin-b-75">
            {taskList}
        </ListGroup>
    );
}

export default TaskList;
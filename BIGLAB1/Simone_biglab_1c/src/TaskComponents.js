import dayjs from 'dayjs'

import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

import PeopleFill from 'react-bootstrap-icons/dist/icons/people-fill';
import ThreeDotsVertical from 'react-bootstrap-icons/dist/icons/three-dots-vertical';
import Trash2Fill from 'react-bootstrap-icons/dist/icons/trash2-fill';
import PencilSquare from 'react-bootstrap-icons/dist/icons/pencil-square';

import { tl } from './data';

import React, {useState} from 'react';

function Task(props) {
    return (
        <ListGroup.Item className="d-flex align-items-center">
            <Col as="span" className={props.isUrgent && "text-danger font-weight-bold"}>
                <Form.Check
                    custom
                    type="checkbox"
                    id={"custom-checkbox-" + props.id}
                    label={props.description}
                />
            </Col>
            <Col as="span" className="text-dark text-center">{props.isPrivate && <PeopleFill />}</Col>
            <Col as="span" className="font-075 text-right d-flex justify-content-end"><span>{props.date}</span><TaskControls taskID={props.id} deleteTask={props.deleteTask} /></Col>
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
                <Dropdown.Item className="px-3"><PencilSquare className="mr-3" size={16} />Edit</Dropdown.Item>
                <Dropdown.Item className="px-3" onClick={() => props.deleteTask(props.taskID)}><Trash2Fill className="mr-3" size={16} />Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function TaskList(props) {
    let newList = applyFilter(props.activeFilter, props.tasks);
    const taskList = newList.map(task => <Task key={task.id} {...task} deleteTask={props.deleteTask} />);

    return (
        <ListGroup variant="flush" className="margin-b-75">
            {taskList}
        </ListGroup>
    );
}

const applyFilter = (selected, list) => {
    switch(selected){
        case 1:
            return [...list];
        case 2:
            return (list.filter( task => task.isUrgent ));
        case 3:
            return (list.filter( task => {
                if (dayjs(task.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") ) return true;
                else return false;
            }));
        case 4:
            return (list.filter( task => {
                if (dayjs(task.date).isAfter( dayjs().add(7, 'day') )) return true;
                else return false;
            }));
        case 5:
            return (list.filter( task => task.isPrivate ));
        default:
            return [...list];
    }
}

export default TaskList;
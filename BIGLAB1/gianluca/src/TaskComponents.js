import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import {ListGroup, Col, Form, Dropdown} from 'react-bootstrap';

import {PersonFill, ThreeDotsVertical, Trash2Fill, PencilSquare} from 'react-bootstrap-icons';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TaskForm } from './AdderComponents';

dayjs.extend(isBetween);

function Task(props) {
    const { task, deleteTask, ...propsObj } = props;    

    return (
        props.editMode === task.id ? <TaskForm {...propsObj} /> :
        <ListGroup.Item className="d-flex align-items-center">
            <Col as="span" className={task.isUrgent && "text-danger font-weight-bold"}>
                <Form.Check
                    custom
                    type="checkbox"
                    id={"custom-checkbox-" + task.id}
                    label={task.description}
                />
            </Col>
            <Col as="span" className="text-dark text-center">{task.isPrivate && <PersonFill size={20} />}</Col>
            <Col as="span" className="font-075 text-right d-flex justify-content-end align-items-center">
                <span>{task.date.format("dddd D MMMM YYYY [at] H:mm")}</span>
                <TaskControls taskID={task.id} deleteTask={deleteTask} editTask={props.editTask} />
            </Col>
        </ListGroup.Item>
    );
}

function TaskList(props) {
    const { tasks, activeFilter, ...propsObj } = props;

    let newList = applyFilter(activeFilter, tasks);
    
    const taskList = [...newList].map(task => <Task key={task.id} task={task} {...propsObj} />);
    
    return (
        <ListGroup variant="flush" className="margin-b-75">
            {taskList}
        </ListGroup>
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
                <Dropdown.Item className="px-3" onClick={() => props.editTask(props.taskID)}>
                    <PencilSquare className="mr-3" size={16} />
                    Edit
                </Dropdown.Item>
                <Dropdown.Item className="px-3" onClick={() => props.deleteTask(props.taskID)}>
                    <Trash2Fill className="mr-3" size={16} />
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

const applyFilter = (selected, list) => {
    switch (selected) {
        case 2:
            return (list.filter(task => task.isUrgent));
        case 3:
            return (list.filter(task => {
                if (dayjs(task.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) return true;
                else return false;
            }));
        case 4:
            return (list.filter(task => {
                if (dayjs(task.date).isBetween(
                    dayjs().startOf('d').add(1, 'day').subtract(1, 'minute'), dayjs().startOf('d').add(8, 'day')
                )) return true;
                else return false;
            }));
        case 5:
            return (list.filter(task => task.isPrivate));
        default:
            return list;
    }
}

export default TaskList;
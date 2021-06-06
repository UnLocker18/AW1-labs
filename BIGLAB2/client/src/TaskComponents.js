import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';

import { ListGroup, Col, Form, Dropdown } from 'react-bootstrap';

import {
  PersonFill,
  ThreeDotsVertical,
  Trash2Fill,
  PencilSquare,
  ArrowRepeat,
} from 'react-bootstrap-icons';

import React, { useState } from 'react';
import { TaskForm } from './AdderComponents';

dayjs.extend(isBetween);
dayjs.extend(isToday);

const chooseTaskColor = task => {
  let res = '';
  if (task.isUrgent) {
    res = 'text-danger font-weight-bold';
  }
  if (task.isUrgent && task.completed) {
    res = 'font-weight-bold';
  }
  return res;
};

function Task(props) {
  const { task, deleteTask, ...propsObj } = props;

  return props.editMode === task.id ? (
    <TaskForm {...propsObj} tskID={task.id} />
  ) : (
    <ListGroup.Item
      className={`d-flex align-items-center ${task.status} ${
        task.completed && 'bg-completed text-completed'
      }`}
    >
      <Col as="span" className={chooseTaskColor(task)}>
        {task.status ? (
          <span>
            <ArrowRepeat
              size={16}
              className={'loading-animation text-black mr-2'}
            />
            {task.description}
          </span>
        ) : (
          <Form.Check
            custom
            type="checkbox"
            id={'custom-checkbox-' + task.id}
            label={task.description}
            onChange={ev => props.completeTask(ev.target.checked, task.id)}
            checked={task.completed}
          />
        )}
      </Col>
      <Col as="span" className="text-dark text-center">
        {task.isPrivate && (
          <PersonFill
            size={20}
            className={task.completed && 'text-completed'}
          />
        )}
      </Col>
      <Col
        as="span"
        className="font-075 text-right d-flex justify-content-end align-items-center"
      >
        <span className="d-flex justify-content-end align-items-center">
          <span>
            {task.date && task.date.format('dddd D MMMM YYYY [at] H:mm')}
          </span>
          <span>
            {task.completed ? (
              <Trash2Fill
                color={'#000'}
                className="ml-2 hover-scaleup"
                size={16}
                onClick={() => props.deleteTask(task.id)}
              />
            ) : (
              <TaskControls
                taskID={task.id}
                taskCompleted={task.completed}
                deleteTask={deleteTask}
                editTask={props.editTask}
              />
            )}
          </span>
        </span>
      </Col>
    </ListGroup.Item>
  );
}

function TaskList(props) {
  const { tasks, activeFilter, ...propsObj } = props;
  const taskList = tasks.map(task => (
    <Task key={task.id} task={task} {...propsObj} />
  ));

  return (
    <ListGroup variant="flush" className="margin-b-75">
      {taskList}
    </ListGroup>
  );
}

function TaskControls(props) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

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
              child =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  return (
    <Dropdown className="d-inline ml-2">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <ThreeDotsVertical color="" size={18} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="min-width-5" as={CustomMenu}>
        <Dropdown.Item
          className="px-3"
          onClick={() => props.editTask(props.taskID)}
          disabled={props.taskCompleted ? true : false}
        >
          <PencilSquare className="mr-3" size={16} />
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          className="px-3"
          onClick={() => props.deleteTask(props.taskID)}
        >
          <Trash2Fill className="mr-3" size={16} />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TaskList;

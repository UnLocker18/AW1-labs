import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import PersonSquare from 'react-bootstrap-icons/dist/icons/person-square';

import {tasks} from './data';

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
            <Col as="span" className="font-075 text-right">{props.date}</Col>
        </ListGroup.Item>
    );
}

function TaskList() {
    const taskList = tasks.map(task => <Task key={task.id} {...task} />);
    return (
        <ListGroup variant="flush" className="margin-b-75">
            {taskList}
        </ListGroup>
    );
}

export default TaskList;
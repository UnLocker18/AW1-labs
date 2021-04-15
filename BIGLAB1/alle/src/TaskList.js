import 'bootstrap/dist/css/bootstrap.css';
import {
    ListGroup, Col, Form
} from 'react-bootstrap'
import { 
    PeopleFill, Pencil, Trash2, 
} from 'react-bootstrap-icons';
import dayjs from 'dayjs'

function TaskList(props) {
    return(
        <ListGroup as="ul" variant="flush">
            {props.tasks.map(
                (tsk) => <Task {...tsk}  key={tsk.id}/>
            )}
        </ListGroup>
    );
}

function Task(props) {
    return(
        <ListGroup.Item className="d-flex justify-content-between pr-0">
            <Col md={4} className="d-inline">
                <TaskCheckbox name={props.name} important={props.important} />
            </Col>
            <Col as="span" md={4} className="text-center">
                {!props.private && (<PeopleFill size={20}/>)}
            </Col>
            <Col as="span" md={4} className="text-right">
                {props.deadline ? props.deadline.format("MMMM DD, YYYY HH:mm") : ""}
                <TaskControls />
            </Col>
        </ListGroup.Item>
    );
}

function TaskCheckbox(props) {
    return (
        <Form>
            <Form.Row>
                <Form.Check type="checkbox" id={`${props.name}-checkbox`} custom />
                <Form.Check.Label>
                    {props.important ? (<strong className="text-danger">{props.name}</strong>) :  props.name}
                </Form.Check.Label>
            </Form.Row>
        </Form>
    );
}

function TaskControls() {
    return (
        <span className="pl-4">
            <a href="#">
                <Pencil size={20} color="GoldenRod" />
            </a>
            <a href="#">
                <Trash2 size={20} color="FireBrick" />
            </a>
            
        </span>
    );
}

export default TaskList;

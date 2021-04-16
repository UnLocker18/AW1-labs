import {PersonSquare} from 'react-bootstrap-icons'
import {ListGroup} from 'react-bootstrap'
import {Form} from 'react-bootstrap'

function TaskList(props)
{
    return <>
        <ListGroup variant="flush" >
            <ListGroup.Item key={0}><span className="size_2">All</span></ListGroup.Item>

            <ListGroup.Item  className="d-flex justify-content-between" key={props.taskList[0].id}>
                <Form>
                    <Form.Check inline aria-label="option 1" />
                    <span >{props.taskList[0].description}</span>
                </Form> 
                
                <span>{props.taskList[0].deadline.format("YYYY-MM-DD--HH:mm")}</span>
            </ListGroup.Item>

            <ListGroup.Item  className="d-flex justify-content-between" key={props.taskList[1].id}>
                <Form>
                    <Form.Check inline aria-label="option 1" />
                    <span >{props.taskList[1].description}</span>
                </Form> 
            </ListGroup.Item>

            <ListGroup.Item  className="d-flex justify-content-between" key={props.taskList[2].id}>
                <Form>
                    <Form.Check inline aria-label="option 1" />
                    <span >{props.taskList[2].description}</span>
                </Form>   
            </ListGroup.Item>

            <ListGroup.Item  className="d-flex justify-content-between" key={props.taskList[3].id}>
                <Form>
                    <Form.Check inline aria-label="option 1" />
                    <span >{props.taskList[3].description}</span>
                </Form>   
                <PersonSquare className="size_2" variant="success"/>
                <span />
            </ListGroup.Item>

            <ListGroup.Item  className="d-flex justify-content-between" key={props.taskList[4].id}>
                <Form>
                    <Form.Check inline aria-label="option 1" />
                    <span >{props.taskList[4].description}</span>
                </Form> 
                <PersonSquare className="size_2" variant="success"/>
                <span>{props.taskList[4].deadline.format("YYYY-MM-DD--HH:mm")}</span>
            </ListGroup.Item>
        </ListGroup>
    </>;
}

export default TaskList;
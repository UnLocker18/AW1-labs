import {Button} from 'react-bootstrap'
import {ListGroup} from 'react-bootstrap'

function NewFiltersList(props) 
{
    return <>
    <ListGroup variant="flush">
        <ListGroup.Item  variant="light"  key={props.taskList[0].id}>
            <Button type="button" variant="success" active="true">{props.filterList[0]}</Button>
        </ListGroup.Item>
        <ListGroup.Item  variant="light" key={props.taskList[1].id}>
            <Button type="button" variant="light">{props.filterList[1]}</Button>
        </ListGroup.Item>
        <ListGroup.Item  variant="light" key={props.taskList[2].id}> 
            <Button type="button" variant="light">{props.filterList[2]}</Button>
        </ListGroup.Item>
        <ListGroup.Item  variant="light" key={props.taskList[3].id}>
            <Button type="button" variant="light">{props.filterList[3]}</Button>
        </ListGroup.Item>
        <ListGroup.Item  variant="light" key={props.taskList[4].id}>
            <Button type="button" variant="light">{props.filterList[4]}</Button>
        </ListGroup.Item>
    </ListGroup>
    </>    
    ;
}

export default NewFiltersList;
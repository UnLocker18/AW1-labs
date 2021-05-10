import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Container, Row} from 'react-bootstrap'
import NewNavbar from './NewNavbar'
import NewFiltersList from './NewFilterList'
import TaskList from './TaskList'
import {task, list} from './Tasks'
import IconAdd from './IconAdd'

import './App.css';

function App() {

  return (
    <Container fluid>
      <NewNavbar></NewNavbar>
      <Row>
        <Col md={3} className="m-3">
          <NewFiltersList filterList={list} taskList={task} /> 
        </Col>
        <Col md={8} className="m-3">
         <TaskList taskList={task} /> 
        </Col>
      </Row>
      <IconAdd />
    </Container>
  );
}

export default App;

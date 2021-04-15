import 'bootstrap/dist/css/bootstrap.css';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import dayjs from 'dayjs';
import TitleNavbar from './TitleNavbar';
import FilterMenu from './FilterNav'
import TaskList from './TaskList'
import AddBtn from './AddButton'
import './App.css';

const tasks = [
  {id: 0, name: "Big Lab 1", important: false, private: false, deadline: undefined,},
  {id: 1, name: "Groceries", important: true, private: false, deadline: dayjs("2021-04-02T08:30:00.000Z"),},
  {id: 2, name: "Clean garage", important: false, private: true, deadline: undefined,}
]

const filters = ["All", "Important", "Today", "Next 7 Days", "Private"];

function App() {
  return (
    <Container fluid className="p-0 h-100">

      <Row noGutters>
        <Col as="header" md={12} className="p-0">
          <TitleNavbar />
        </Col>
      </Row>
      <Row as="main" noGutters className="full-height">
        <Col as="aside" md={4} className="collapse d-md-block bg-light mh-100 p-3" id="filters">
          <FilterMenu filters={filters} />
        </Col>
        <Col as="article" md={8} className="my-3 px-3">
          <h1> All </h1>
          <TaskList tasks={tasks}/>
          <AddBtn />
        </Col>
      </Row>

    </Container> 
  );
}

export default App;

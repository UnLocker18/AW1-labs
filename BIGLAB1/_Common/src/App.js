import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TaskList from './TaskComponents';
import FilterList from './FilterComponents';
import MainNav from './MainNav'

import PlusCircleFill from 'react-bootstrap-icons/dist/icons/plus-circle-fill';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function Aside() {
  return <Col as="aside" lg={4} className="collapse d-lg-block bg-light py-3"><FilterList /></Col>;
}

function Main() {
  return (
    <Col as="main" lg={8} className="py-3"><h1>All</h1>
      <TaskList />
      <Container fluid className="fixed-bottom d-flex justify-content-between px-4 mb-4">
        <div />
        <PlusCircleFill color="#17a2b8" size={64} />
      </Container>
    </Col>
  );
}

function App() {
  return (
    <Container fluid className="d-flex flex-column height-100 m-0 p-0">
      <MainNav />
      <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
        <Aside />
        <Main />
      </Container>
    </Container>
  );
}

export default App;

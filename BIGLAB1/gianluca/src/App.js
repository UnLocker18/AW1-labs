import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import TaskList from './TaskComponents';
import FilterList from './FilterComponents';
import MainNav from './MainNav'

import PlusCircleFill from 'react-bootstrap-icons/dist/icons/plus-circle-fill';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';

function Aside(props) {
  return (
    <Collapse in={props.open}>
      <Col as="aside" lg={4} className="bg-light py-3">
        <FilterList activeFilter={props.activeFilter} setActiveFilter={props.setActiveFilter} />
      </Col>
    </Collapse>);
}

function Main(props) {
  return (
    <Col as="main" lg={8} className="py-3"><h1>All</h1>
      <TaskList activeFilter={props.activeFilter} />
      <Container fluid className="fixed-bottom d-flex justify-content-between px-4 mb-4">
        <div />
        <PlusCircleFill color="#17a2b8" size={64} />
      </Container>
    </Col>
  );
}

function App() {
  const [open, setOpen] = useState(true);
  const toggleOpen = (op) => setOpen(!op);

  const handleMediaQueryChange = (matches) => setOpen(matches);
  const lg = useMediaQuery(
    { minWidth: 992 }, undefined, handleMediaQueryChange
  );

  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <Container fluid className="d-flex flex-column height-100 m-0 p-0">
      <MainNav open={open} toggleOpen={toggleOpen} />
      <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
        <Aside open={open} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <Main activeFilter={activeFilter} />
      </Container>
    </Container>
  );
}

export default App;

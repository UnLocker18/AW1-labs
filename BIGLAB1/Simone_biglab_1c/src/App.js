import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TaskList from './TaskComponents';
import FilterList from './FilterComponents';
import MainNav from './MainNav'

import PlusCircleFill from 'react-bootstrap-icons/dist/icons/plus-circle-fill';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';

import React, {useState} from 'react';

import {filters, tl} from './data';
import ModalForm from './ModalForm'

function App() {
  const [open, setOpen] = useState(true);

  return (
    <Container fluid className="d-flex flex-column height-100 m-0 p-0">
      <MainNav toggleCollapse={isOpen => setOpen(isOpen)} />
      <Content isOpen={open} />
    </Container>
  );
}

function Content(props) {
  const [chosenFilter, setChosenFilter] = useState(1);

  return(
    <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
      <Aside chooseFilter={(filterID) => setChosenFilter(filterID)} isOpen={props.isOpen} />
      <Main activeFilter={chosenFilter} />
    </Container>
  );
}

function Aside(props) {
  const { width } = useViewport();
  const breakpoint = 992;

  const show = (width > breakpoint);

  return ( 
    <Collapse in={props.isOpen}>
      <Col as="aside" lg={4} xs={12} className={show ? "show bg-light py-3" : "bg-light py-3"}>
        <FilterList chooseFilter={props.chooseFilter} id="filter-list"/>
      </Col>
    </Collapse>
  );
}

function Main(props) {

  const [modal, setModal] = useState(false);

  const [tasks, setTasks] = useState([...tl]);
  const [id, setId] = useState(tasks.length+1);
  const deleteTask = (tskID) => {
    setTasks( tsks => tsks.filter( t => t.id != tskID ) );
  }
  const addTask= (task) => {
    setTasks( tsks => [...tsks, task]);
    setId( (oldId) => oldId+1);
  }

  
    

  return (
    <Col as="main" lg={8} className="py-3"><h1>{filters[props.activeFilter - 1].text}</h1>
      <TaskList tl={tl} tasks={tasks} deleteTask={deleteTask} activeFilter={props.activeFilter} modal={modal} setModal={setModal} />
      <Container fluid className="fixed-bottom d-flex justify-content-between px-4 mb-4">
        <div />
        <PlusCircleFill color="#17a2b8" size={64} onClick={ () => setModal(true)} />
        <ModalForm modal={modal} setModal={setModal} addTask={addTask} idTask={id} />
      </Container>
    </Col>
  );
}

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  React.useEffect( () => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [] );

  return { width };
}

export default App;

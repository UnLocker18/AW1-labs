import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TaskList from './TaskComponents';
import FilterList from './FilterComponents';
import MainNav from './MainNav'

import PlusCircleFill from 'react-bootstrap-icons/dist/icons/plus-circle-fill';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import {filters, tasks} from './data';
import {useState} from 'react'

function Aside(props) {
  return(
    props.visible && <Col as="aside" lg={4} className="bg-light py-3">
      <FilterList list={filters} choose = {props.choose} selected = {props.selected}/>
    </Col>
  )
}

function Main(props) {

  const[list, setList] = useState(tasks)

  const deleteTask = (id) => {
    setList(oldList => oldList.filter( task => task.id !== id))
  }

  return (
    <Col as="main" className="py-3">
      <h2><strong>Filter: </strong>{filters[props.selected - 1].text}</h2>
      <TaskList list={list} filter = {props.selected} deleteTask={deleteTask}/>
      <Container fluid className="fixed-bottom d-flex justify-content-between px-4 mb-4">
        <div />
        <PlusCircleFill color="#17a2b8" size={64} />
      </Container>
    </Col>
  );
}

function App() {
  
  const[filter, setFilter] = useState(1)
  const[asideVisible, setAsideVisible] = useState(true)

  const chooseFilter = (filter) => {
    setFilter(filter)
  }
  
  const toggleMenu = () => {
    setAsideVisible(visible => !visible)
  }

  window.addEventListener("resize", () => {
    if(window.innerWidth >= 992){
      setAsideVisible(true)
    }
  })

  return (
    <Container fluid className="d-flex flex-column height-100 m-0 p-0">
      <MainNav toggleMenu={toggleMenu}/>
      <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0"> 
        <Aside visible={asideVisible} selected={filter} choose={chooseFilter}/>
        <Main selected={filter}/>
      </Container>
    </Container>
  ); 
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {TaskList,TaskHeader} from './TaskComponents';
import FilterList from './FilterComponents';
import MainNav from './MainNav'
import AddButton from './AddButton'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import {filters, tasks} from './data'

import {useState} from 'react'

function Aside(props) {
  return <Col as="aside" lg={4} className="bg-light py-3">
            <FilterList filters={filters} selected={props.selected} chooseFilter={props.chooseFilter} open={props.open}/>
         </Col>;
}

function Main(props) {
  return (
    <Col as="main" lg={8} className="py-3">
      <TaskHeader selected={props.selected} filters={filters} />
      <TaskList selected={props.selected} list={props.list} deleteTask={props.deleteTask}/>
      <Container fluid className="fixed-bottom d-flex justify-content-between px-4 mb-4">
        <div />
        <AddButton />
      </Container>
    </Col>
  );
}

function App() {

  let [selected, setSelected] = useState(1);
  const chooseFilter = (id) =>{ setSelected(id); }

  let [open, setOpen] = useState(true);
  const toggleFilter = () => { setOpen(!open); }

  let [list, setList] = useState([...tasks]);
  const deleteTask = (id) => { setList( oldList => oldList.filter( task => task.id !== id) )  };

  return (
      <Container fluid className="d-flex flex-column height-100 m-0 p-0">
        <MainNav toggleFilter={toggleFilter} />
        <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
          <Aside selected={selected} chooseFilter={chooseFilter} open={open}/>
          <Main selected={selected} list={list} deleteTask={deleteTask} />
        </Container>
      </Container>
  );
}

export default App;

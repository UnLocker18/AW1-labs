import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Main from './Main';
import FilterList from './FilterComponents';
import MainNav from './MainNav'

import {Container, Col, Collapse} from 'react-bootstrap';

import React, {useState} from 'react';

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

  const { width } = useViewport();
  const breakpoint = 992;

  const lg = (width > breakpoint);

  return(
    <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
      <Aside lg={lg} chooseFilter={(filterID) => setChosenFilter(filterID)} isOpen={props.isOpen} />
      <Main lg={lg} activeFilter={chosenFilter} />
    </Container>
  );
}

function Aside(props) {
  return ( 
    <Collapse in={props.isOpen}>
      <Col as="aside" lg={4} xs={12} className={props.lg ? "show bg-light py-3" : "bg-light py-3"}>
        <FilterList chooseFilter={props.chooseFilter} id="filter-list"/>
      </Col>
    </Collapse>
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

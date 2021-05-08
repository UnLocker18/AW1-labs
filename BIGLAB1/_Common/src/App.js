import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Main from './Main';
import FilterList from './FilterComponents';
import MainNav from './MainNav'
import {filters} from './data'

import {Container, Col, Collapse} from 'react-bootstrap';

import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from "react-router-dom"

function App() {
  const [open, setOpen] = useState(true);

  return (
    <Router>
      <Container fluid className="d-flex flex-column height-100 m-0 p-0">
        <MainNav toggleCollapse={isOpen => setOpen(isOpen)} />
        <Content isOpen = {open} />
        {/* <Switch>
          <Route exact path = "/all" render={({match}) => <Content isOpen = {open} url = {match.path}/>}/>
          <Route exact path = "/important" render={({match}) => <Content isOpen = {open} url = {match.path}/>}/>
          <Route exact path = "/today" render={({match}) => <Content isOpen = {open} url = {match.path}/>}/>
          <Route exact path = "/next_week" render={({match}) => <Content isOpen = {open} url = {match.path}/>}/>
          <Route exact path = "/private" render={({match}) => <Content isOpen = {open} url = {match.path}/>}/>
          <Route><Redirect to = "/all"/></Route>
        </Switch> */}
      </Container>    
    </Router>
  );
}

function Content(props) {
  const location = useLocation();
  const filter = filters.filter( filter => filter.url === location.pathname);
  // const [chosenFilter, setChosenFilter] = useState(filter[0] ? filter[0].url : '/all');

  //console.log(chosenFilter)

  const { width } = useViewport();
  const breakpoint = 992;

  const lg = (width > breakpoint);

  return(
    <Container fluid className="d-flex flex-lg-grow-1 flex-wrap m-0 p-0">
      <Aside lg={lg} isOpen={props.isOpen} />
      <Main lg={lg} activeFilter={filter[0] ? filter[0].url : '/all'}/>
    </Container>
  );
}

function Aside(props) {
  return ( 
    <Collapse in={props.isOpen}>
      <Col as="aside" lg={4} xs={12} className={props.lg ? "show bg-light py-3" : "bg-light py-3"}>
        <Switch>
          <Route exact path="/:url" render={ () => <FilterList id="filter-list" /> }  />
          <Route path="/" render={ () => <Redirect to="/all" /> } />
        </Switch>
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

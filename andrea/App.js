import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header.js"
import {Container} from "react-bootstrap"
import {Row} from "react-bootstrap"
import {Col} from "react-bootstrap"
import FilterMenu from "./FilterMenu.js"
import MainMenu from "./MainMenu.js"
import {Button} from "react-bootstrap"

function App() {
  return (
    <Container fluid>
      <Row>
        <Col className="p-0">
          <Header/>
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="aside p-0">
          <FilterMenu/>
        </Col>
        <Col className="main p-0">
          <MainMenu currentFilterName="All"/>
        </Col>
      </Row>
      <Button className="addTask rounded-circle border-0 text-white bg-success">+</Button>
    </Container>
  );
}

export default App;

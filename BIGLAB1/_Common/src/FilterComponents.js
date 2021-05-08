import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import { filters } from "./data";

function Filter(props) {
  return (
    <NavLink
      to={props.url}
      className="rounded-0 border-top text-dark hover-bg-light nav-link"
      onClick={() => props.chooseFilter(props.url)}
    >
      {props.text}
    </NavLink>
  );
}

function FilterList(props) {
  const filterList = filters.map((filter) => (
    <Filter key={filter.id} chooseFilter={props.chooseFilter} {...filter} />
  ));
  return (
    <Nav
      variant="pills"
      className="flex-column"
      defaultActiveKey="1"
      id="filter-list"
    >
      {filterList}
    </Nav>
  );
}

export default FilterList;

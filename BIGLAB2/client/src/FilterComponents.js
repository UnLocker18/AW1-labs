import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

import { filters } from './data';
import { filterToUrl } from './utils';

function Filter(props) {
  return (
    <NavLink
      to={filterToUrl(props.text)}
      className="rounded-0 border-top text-dark hover-bg-light nav-link"
    >
      {props.text}
    </NavLink>
  );
}

function FilterList() {
  const filterList = filters.map(filter => (
    <Filter key={filter.id} {...filter} />
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

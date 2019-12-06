import React from "react";
import PropTypes from "prop-types";

import {Link} from "react-router-dom";


const Breadcrumbs = (props) => {
  const {curFilmID, name} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${curFilmID}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  curFilmID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Breadcrumbs;

import React from "react";
import PropTypes from "prop-types";
import Constants from "../../constants";
import {Link} from "react-router-dom";


const Logo = (props) => {
  const {isLight, isDisabled} = props;

  return (
    <div className="logo">
      <Link to="/" className={`logo__link${(isLight) ? ` logo__link--light` : ``}`}
        style={isDisabled ? Constants.Style.NO_EVENTS : Constants.Style.NO_STYLE}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  isLight: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

Logo.defaultProps = {
  isDisabled: false
};

export default Logo;

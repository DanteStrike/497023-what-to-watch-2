import React from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";


const PageHeader = (props) => {
  const {mixinClass, rightPart} = props;

  return (
    <header className={`page-header ${mixinClass}`}>
      <Logo/>
      {rightPart}
    </header>
  );
};

PageHeader.propTypes = {
  mixinClass: PropTypes.string,
  rightPart: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

export default PageHeader;

import React from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";


const PageHeader = (props) => {
  const {mixinClass, rightPart, isLogoDisabled} = props;

  return (
    <header className={`page-header${mixinClass ? ` ${mixinClass}` : ``}`}>
      <Logo isLight={false} isDisabled={isLogoDisabled}/>
      {rightPart}
    </header>
  );
};

PageHeader.propTypes = {
  mixinClass: PropTypes.string,
  rightPart: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  isLogoDisabled: PropTypes.bool
};

export default PageHeader;

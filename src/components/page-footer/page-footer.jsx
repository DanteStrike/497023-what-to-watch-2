import React from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";


const PageFooter = (props) => {
  const {isLogoDisabled} = props;

  return (
    <footer className="page-footer">
      <Logo isLight={true} isDisabled={isLogoDisabled}/>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  isLogoDisabled: PropTypes.bool
};

PageFooter.defaultProps = {
  isLogoDisabled: false
};

export default PageFooter;

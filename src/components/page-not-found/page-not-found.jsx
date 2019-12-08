import React from "react";

import PageFooter from "../page-footer/page-footer.jsx";
import Constants from "../../constants";


const PageNotFound = () => {
  return (
    <div className="user-page">
      <div className="user-page__content" style={Constants.Styles.DISPLAY_FLEX}>
        <div style={Constants.Styles.MARGIN_AUTO}>
          <h1>404.</h1>
          <p>Page not found</p>
        </div>
      </div>
      <PageFooter/>
    </div>
  );
};

export default PageNotFound;

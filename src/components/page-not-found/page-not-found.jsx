import React from "react";

import PageFooter from "../page-footer/page-footer.jsx";
import Enum from "../../enum";


const PageNotFound = () => {
  return (
    <div className="user-page">
      <div className="user-page__content" style={Enum.Styles.DISPLAY_FLEX}>
        <div style={Enum.Styles.MARGIN_AUTO}>
          <h1>404.</h1>
          <p>Page not found</p>
        </div>
      </div>
      <PageFooter/>
    </div>
  );
};

export default PageNotFound;

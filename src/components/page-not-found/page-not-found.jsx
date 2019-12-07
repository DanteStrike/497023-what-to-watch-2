import React from "react";

import PageFooter from "../page-footer/page-footer.jsx";


const PageNotFound = () => {
  return (
    <div className="user-page">
      <div className="user-page__content" style={{display: `flex`}}>
        <div style={{margin: `auto`}}>
          <h1>404.</h1>
          <p>Page not found</p>
        </div>
      </div>

      <PageFooter/>
    </div>
  );
};

export default PageNotFound;

import React from "react";


const PageNotFound = () => {
  return (
    <div className="user-page">
      <div className="user-page__content" style={{display: `flex`}}>
        <div style={{margin: `auto`}}>
          <h1>404.</h1>
          <p>Page not found</p>
        </div>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="#" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};


export default PageNotFound;

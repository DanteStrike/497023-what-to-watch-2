import React from "react";

import {Link} from "react-router-dom";


const clearLinkStyle = {
  textDecoration: `none`,
  color: `unset`
};

const ClearLink = (props) => {
  return (
    <Link {...props} style={clearLinkStyle}/>
  );
};

export default ClearLink;

import React from "react";

import {Link} from "react-router-dom";
import Constants from "../../constants";

const ClearLink = (props) => {
  return (
    <Link {...props} style={Constants.Style.CLEAR_LINK}/>
  );
};

export default ClearLink;

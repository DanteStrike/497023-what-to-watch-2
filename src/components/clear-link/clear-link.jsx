import React from "react";

import {Link} from "react-router-dom";
import Enum from "../../enum";

const ClearLink = (props) => {
  return (
    <Link {...props} style={Enum.Styles.CLEAR_LINK}/>
  );
};

export default ClearLink;

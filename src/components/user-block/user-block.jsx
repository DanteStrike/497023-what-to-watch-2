import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const UserBlock = (props) => {
  const {isAuth, avatarSrc} = props;

  return (
    <div className="user-block">
      {
        isAuth ?
          <div className="user-block__avatar">
            <img src={avatarSrc} alt="User avatar" width="63" height="63"/>
          </div>
          :
          <Link to="/login" className="user-block__link">Sign in</Link>
      }
    </div>
  );
};

UserBlock.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  avatarSrc: PropTypes.string.isRequired
};

UserBlock.defaultProps = {
  isAuth: false
};


export default UserBlock;

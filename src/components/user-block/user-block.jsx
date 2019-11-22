import React from "react";
import PropTypes from "prop-types";

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
          <a href="sign-in.html" className="user-block__link">Sign in</a>
      }
    </div>
  );
};

UserBlock.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  avatarSrc: PropTypes.string.isRequired
};

UserBlock.defaultProps = {
  isAuth: true,
  avatarSrc: `img/avatar.jpg`
};


export default UserBlock;

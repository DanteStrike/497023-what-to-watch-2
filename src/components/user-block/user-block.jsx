import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {Link} from "react-router-dom";

import {userSelectors} from "../../reducers/user/user";


const UserBlock = (props) => {
  const {isAuth, avatarUrl} = props;

  return (
    <div className="user-block">
      {
        isAuth ?
          <div className="user-block__avatar">
            <Link to="/mylist">
              <img src={avatarUrl} alt="User avatar" width="63" height="63"/>
            </Link>
          </div>
          :
          <Link to="/login" className="user-block__link">Sign in</Link>
      }
    </div>
  );
};

UserBlock.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: userSelectors.getIsAuth(state),
  avatarUrl: userSelectors.getAvatarUrl(state)
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);

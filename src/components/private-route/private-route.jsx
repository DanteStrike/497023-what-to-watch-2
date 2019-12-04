import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {userSelectors} from "../../reducers/user";

const PrivateRoute = (props) => {
  const {component: Component, isAuth} = props;

  const rest = Object.assign({}, props);
  delete rest.component;
  delete rest.isAuth;

  return (
    <Route
      {...rest}
      render={
        (routerProps) => (
          isAuth ?
            <Component {...routerProps}/>
            :
            <Redirect
              to={{
                pathname: `/login`,
                state: {referrer: rest.path ? rest.path : ``}
              }}
            />
        )
      }
    />
  );
};


PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => ({
  isAuth: userSelectors.getIsAuth(state)
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

import {userOperations, userSelectors} from "../../reducers/user/user";


const PrivateRoute = (props) => {
  const {component: Component, isAuth, checkAuth} = props;

  const rest = Object.assign({}, props);
  delete rest.component;
  delete rest.isAuth;

  useEffect(() => {
    checkAuth();
  }, []);

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
                state: {referrer: rest.location.pathname ? rest.location.pathname : null}
              }}
            />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: userSelectors.getIsAuth(state)
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(userOperations.checkAuth())
});

export {PrivateRoute};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {compose} from "recompose";
import {userActions, userOperations, userSelectors} from "../../reducers/user/user";
import axios from "axios";

import PageHeader from "../page-header/page-header.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import Login from "../login/login.jsx";
import withToggleState from "../../hocs/with-toggle-state/with-toggle-state.jsx";
import withInput from "../../hocs/with-input/with-input.jsx";
import withValidation from "../../hocs/with-validation/with-validation.jsx";
import {checkEmail, checkPassword} from "../../utils/validation/validation.js";

const LoginWrapped = compose(
    withToggleState(`isSubmitting`, false, `toggleFormLock`),
    withInput(`email`, `onEmailChange`, ``),
    withInput(`password`, `onPasswordChange`, ``),
    withValidation(`email`, `validateEmail`, `emailValidation`, `resetEmailValidation`, checkEmail),
    withValidation(`password`, `validatePassword`, `passwordValidation`, `resetPasswordValidation`, checkPassword)
)(Login);


class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this._requestAuthHandler = this._requestAuthHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {isAuth, history, location} = this.props;

    if (prevProps.isAuth !== isAuth && isAuth) {
      let newPath;
      if (location.state) {
        newPath = location.state.referrer;
      }
      history.push(newPath || `/`);
    }
  }

  componentWillUnmount() {
    const {resetAuthErrors} = this.props;

    if (this.authRequestToken) {
      this.authRequestToken.cancel(`Operation was aborted by user`);
    }
    resetAuthErrors();
  }


  _requestAuthHandler(email, password) {
    const {sentAuthRequest, resetAuthErrors} = this.props;
    const CancelToken = axios.CancelToken;

    resetAuthErrors();
    this.authRequestToken = CancelToken.source();
    sentAuthRequest(email, password, this.authRequestToken);
  }

  render() {
    const {serverError} = this.props;

    return (
      <div className="user-page">
        <PageHeader
          mixinClass="user-page__head"
          rightPart={<h1 className="page-title user-page__title">Sign in</h1>}
        />
        <LoginWrapped serverError={serverError} requestLogin={this._requestAuthHandler}/>
        <PageFooter/>
      </div>
    );
  }
}

SignInPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  serverError: PropTypes.exact({
    isError: PropTypes.bool.isRequired,
    target: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
  sentAuthRequest: PropTypes.func.isRequired,
  resetAuthErrors: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      referrer: PropTypes.string
    })
  })
};

const mapStateToProps = (state) => ({
  isAuth: userSelectors.getIsAuth(state),
  serverError: userSelectors.getAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  sentAuthRequest: (email, password, source) => dispatch(userOperations.sentAuthRequest(email, password, source)),
  resetAuthErrors: () => dispatch(userActions.resetAuthErrors())
});

export {SignInPage};
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

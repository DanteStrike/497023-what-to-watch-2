import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {connect} from "react-redux";
import PageHeader from "../page-header/page-header.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import Login from "../login/login.jsx";
import {userActions, userOperations, userSelectors} from "../../reducers/user";
import {compose} from "recompose";
import withToggleState from "../../hocs/with-toggle-state/with-toggle-state.jsx";
import withInputValidation from "../../hocs/with-input-validation/with-input-validation.jsx";

const LoginWrapped = compose(
    withToggleState(`isSubmitting`, false, `toggleFormLock`),
    withInputValidation(
        `email`,
        `onEmailChange`,
        ``,
        `validateEmail`,
        `emailValidation`,
        () => ({})
    ),
    withInputValidation(
        `password`,
        `onPasswordChange`,
        ``,
        `validatePassword`,
        `passwordValidation`,
        () => ({})
    )
)(Login);


class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this._requestAuthHandler = this._requestAuthHandler.bind(this);
  }

  componentDidMount() {
    const {resetAuthErrors} = this.props;
    resetAuthErrors();
  }

  componentDidUpdate(prevProps) {
    const {isAuth, history, location} = this.props;

    if (prevProps.isAuth !== isAuth && isAuth) {
      if (location.state) {
        history.push(location.state.referer || `/`);
      } else {
        history.push(`/`);
      }
    }
  }

  componentWillUnmount() {
    if (this.authRequestToken) {
      this.authRequestToken.cancel(`Operation was aborted by user`);
    }
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
        <div className="sign-in user-page__content">
          <LoginWrapped
            serverValidation={{
              isValid: true,
              type: ``,
              msg: ``
            }}
            requestLogin={this._requestAuthHandler}
          />
        </div>
        <PageFooter/>
      </div>
    );
  }
}

SignInPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  serverError: PropTypes.exact({
    isError: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
  sentAuthRequest: PropTypes.func.isRequired,
  resetAuthErrors: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      referer: PropTypes.string.isRequired
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

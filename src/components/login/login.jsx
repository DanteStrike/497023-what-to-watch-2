import React from "react";
import PropTypes from "prop-types";
import Constants from "../../constants";


class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this._loadingMsg = `Sign-in...`;
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  componentDidUpdate() {
    const {isSubmitting, toggleFormLock, serverError} = this.props;

    if (serverError.isError && isSubmitting) {
      toggleFormLock();
    }
  }

  _handleInputChange(evt) {
    const {onEmailChange, onPasswordChange, resetEmailValidation, resetPasswordValidation} = this.props;

    const target = evt.target;
    const newValue = target.value;

    if (target.id === `user-email`) {
      onEmailChange(newValue);
      resetEmailValidation();
      return;
    }

    if (target.id === `user-password`) {
      onPasswordChange(newValue);
      resetPasswordValidation();
    }
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    const {
      email,
      password,
      validateEmail,
      validatePassword,
      requestLogin,
      toggleFormLock
    } = this.props;

    const isValidEmail = validateEmail();
    if (!isValidEmail) {
      return;
    }

    const isValidPassword = validatePassword();
    if (!isValidPassword) {
      return;
    }

    toggleFormLock();
    requestLogin(email, password);
  }

  _showStatusMsg() {
    const {emailValidation, passwordValidation, serverError, isSubmitting} = this.props;

    const showMsg = serverError.isError || !emailValidation.isValid || !passwordValidation.isValid || isSubmitting;

    if (!showMsg) {
      return null;
    }

    let prioritizedMsg = ``;
    switch (true) {
      case serverError.isError:
        prioritizedMsg = `Server: ${serverError.msg}`;
        break;
      case !emailValidation.isValid:
        prioritizedMsg = `Form: ${emailValidation.msg}`;
        break;
      case !passwordValidation.isValid:
        prioritizedMsg = `Form: ${passwordValidation.msg}`;
        break;
      case isSubmitting:
        prioritizedMsg = this._loadingMsg;
        break;
    }

    return (
      <div className="sign-in__message">
        <p>{prioritizedMsg}</p>
      </div>
    );
  }

  render() {
    const {emailValidation, passwordValidation, serverError, isSubmitting} = this.props;

    return (
      <div className="sign-in user-page__content" style={isSubmitting ? Constants.Style.LOADING_CURSOR : Constants.Style.NO_STYLE}>
        <form action="#" className="sign-in__form" onSubmit={this._handleFormSubmit} style={isSubmitting ? Constants.Style.NO_EVENTS : Constants.Style.NO_STYLE}>
          {this._showStatusMsg()}
          <div className="sign-in__fields">
            <div className={`sign-in__field${(!emailValidation.isValid || serverError.target === `email`) ? ` sign-in__field--error` : ``}`}>
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" onChange={this._handleInputChange} disabled={isSubmitting}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field${(!passwordValidation.isValid || serverError.target === `password`) ? ` sign-in__field--error` : ``}`}>
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" onChange={this._handleInputChange} disabled={isSubmitting}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" disabled={isSubmitting}>Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  emailValidation: PropTypes.exact({
    isValid: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
  resetEmailValidation: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  validatePassword: PropTypes.func.isRequired,
  passwordValidation: PropTypes.exact({
    isValid: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
  resetPasswordValidation: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  toggleFormLock: PropTypes.func.isRequired,
  serverError: PropTypes.exact({
    isError: PropTypes.bool.isRequired,
    target: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
};

export default Login;

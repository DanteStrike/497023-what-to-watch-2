import React from "react";
import PropTypes from "prop-types";
import {LoginValidationType} from "../../utils/enum";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _formSubmitHandler(evt) {
    const {onFormSubmit} = this.props;

    evt.preventDefault();
    onFormSubmit();
  }

  render() {
    const {onEmailChange, onPasswordChange, formValidation, isSubmitting} = this.props;

    return (
      <form action="#" className="sign-in__form" onSubmit={this._formSubmitHandler} style={isSubmitting ? {cursor: `wait`} : {}}>
        {(formValidation.showError || isSubmitting) &&
            <div className="sign-in__message">
              <p>
                {!isSubmitting ? formValidation.msg : `Sign-in...`}
              </p>
            </div>
        }
        <div className="sign-in__fields" style={isSubmitting ? {pointerEvents: `none`} : {}}>
          <div className={`sign-in__field${(formValidation.type === LoginValidationType.EMAIL) ? ` sign-in__field--error` : ``}`}>
            <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
              id="user-email" onChange={onEmailChange} disabled={isSubmitting}/>
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className={`sign-in__field${(formValidation.type === LoginValidationType.PASSWORD) ? ` sign-in__field--error` : ``}`}>
            <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
              id="user-password" onChange={onPasswordChange} disabled={isSubmitting}/>
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit" style={isSubmitting ? {pointerEvents: `none`} : {}}>
          <button className="sign-in__btn" type="submit" disabled={isSubmitting}>Sign in</button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  formValidation: PropTypes.exact({
    showError: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired
};


export default Login;

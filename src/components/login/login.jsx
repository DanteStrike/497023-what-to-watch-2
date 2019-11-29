import React from "react";
import PropTypes from "prop-types";
import PageFooter from "../page-footer/page-footer.jsx";
import PageHeader from "../page-header/page-header.jsx";
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
    const {onEmailChange, onPasswordChange, validation} = this.props;

    return (
      <div className="user-page">
        <PageHeader
          mixinClass="user-page__head"
          rightPart={<h1 className="page-title user-page__title">Sign in</h1>}
        />

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._formSubmitHandler}>
            {validation.showError &&
                <div className="sign-in__message">
                  <p>{validation.msg}</p>
                </div>
            }
            <div className="sign-in__fields">
              <div className={`sign-in__field${(validation.type === LoginValidationType.EMAIL) ? ` sign-in__field--error` : ``}`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                  id="user-email" onChange={onEmailChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={`sign-in__field${(validation.type === LoginValidationType.PASSWORD) ? ` sign-in__field--error` : ``}`}>
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                  id="user-password" onChange={onPasswordChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <PageFooter/>
      </div>
    );
  }
}

Login.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  validation: PropTypes.object
};


export default Login;

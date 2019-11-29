import React from "react";
import {LoginValidationType} from "../../utils/enum";
import {getIsValidEmail} from "../../utils/validation/validation";


const withLogin = (WrappedComponent) => {
  class WithLogin extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        validation: {
          showError: false,
          type: ``,
          msg: ``
        }
      };

      this._emailChangeHandler = this._emailChangeHandler.bind(this);
      this._passwordChangeHandler = this._passwordChangeHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    _emailChangeHandler(evt) {
      this._resetValidation();

      const input = evt.target;
      this.setState({email: input.value});
    }

    _passwordChangeHandler(evt) {
      this._resetValidation();

      const input = evt.target;
      this.setState({password: input.value});
    }

    _formSubmitHandler() {
      switch (true) {
        case !this._validateEmail():
          break;
        case !this._validatePassword():
          break;
      }
    }

    _validateEmail() {
      const {email} = this.state;
      const isValidEmail = getIsValidEmail(email);

      if (!isValidEmail) {
        this.setState({validation: {
          showError: true,
          type: LoginValidationType.EMAIL,
          msg: `Please enter a valid email address`
        }});
      }

      return isValidEmail;
    }

    _validatePassword() {
      const {password} = this.state;
      const isValidPassword = password.length > 0;

      if (!isValidPassword) {
        this.setState({validation: {
          showError: true,
          type: LoginValidationType.PASSWORD,
          msg: `Please enter password`
        }});
      }

      return isValidPassword;
    }

    _resetValidation() {
      const {validation} = this.state;

      if (!validation.showError) {
        return;
      }

      this.setState({validation: {
        showError: false,
        type: ``,
        msg: ``
      }});
    }

    render() {
      const {validation} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          onEmailChange={this._emailChangeHandler}
          onPasswordChange={this._passwordChangeHandler}
          onFormSubmit={this._formSubmitHandler}
          validation={validation}
        />
      );
    }
  }

  return WithLogin;
};

export default withLogin;

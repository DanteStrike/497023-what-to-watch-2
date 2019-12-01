import React from "react";
import PropTypes from "prop-types";
import {LoginValidationType} from "../../utils/enum";
import {getIsValidFormatEmail} from "../../utils/validation/validation";
import {formatServerErrorMsg} from "../../utils/string/string";


const withValidation = (WrappedComponent) => {
  class WithValidation extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        validation: {
          showError: false,
          type: ``,
          msg: ``
        },
        isSubmitting: false
      };

      this._emailChangeHandler = this._emailChangeHandler.bind(this);
      this._passwordChangeHandler = this._passwordChangeHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {serverErrorMsg} = this.props;

      if (prevProps.serverErrorMsg !== serverErrorMsg && serverErrorMsg !== ``) {
        const error = formatServerErrorMsg(serverErrorMsg);

        this.setState({
          validation: {
            showError: true,
            type: error.type,
            msg: `Server: ${error.msg}`
          },
          isSubmitting: false
        });
      }
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
      const {onRequestAuth} = this.props;
      const {email, password} = this.state;

      switch (true) {
        case !this._validateEmail():
          return;
        case !this._validatePassword():
          return;
      }

      onRequestAuth(email, password);
      this.setState({isSubmitting: true});
    }

    _validateEmail() {
      const {email} = this.state;

      if (email === ``) {
        this.setState({validation: {
          showError: true,
          type: LoginValidationType.EMAIL,
          msg: `Form: Please enter email address`
        }});

        return false;
      }

      if (!getIsValidFormatEmail(email)) {
        this.setState({validation: {
          showError: true,
          type: LoginValidationType.EMAIL,
          msg: `Form: Please enter a valid email address`
        }});

        return false;
      }

      return true;
    }

    _validatePassword() {
      const {password} = this.state;
      const isValidPassword = password.length > 0;

      if (!isValidPassword) {
        this.setState({validation: {
          showError: true,
          type: LoginValidationType.PASSWORD,
          msg: `Form: Please enter password`
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
      const {validation, isSubmitting} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          onEmailChange={this._emailChangeHandler}
          onPasswordChange={this._passwordChangeHandler}
          onFormSubmit={this._formSubmitHandler}
          formValidation={validation}
          isSubmitting={isSubmitting}
        />
      );
    }
  }

  WithValidation.propTypes = {
    onRequestAuth: PropTypes.func.isRequired,
    serverErrorMsg: PropTypes.string.isRequired
  };

  return WithValidation;
};

export default withValidation;

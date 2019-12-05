import React from "react";
import {updateObject} from "../../utils/object/object";

const withInputValidation = (
    inputName,
    inputChangeName,
    inputInitValue,
    inputValidateName,
    inputValidationName,
    validationFn
) => (WrappedComponent) => {
  const validationInitState = {
    isValid: true,
    msg: ``
  };

  class WithInputValidation extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [inputName]: inputInitValue,
        [inputValidationName]: validationInitState
      };

      this._changeInputState = this._changeInputState.bind(this);
      this._validateInputValue = this._validateInputValue.bind(this);
    }

    _changeInputState(newValue) {
      this.setState({[inputName]: newValue});

      const isValid = this.state[inputValidationName].isValid;

      if (isValid) {
        return;
      }
      this._resetValidation();
    }

    _validateInputValue() {
      const inputValue = this.state[inputName];
      const newValidationState = validationFn(inputValue);

      if (!newValidationState.isValid) {
        newValidationState.isValid = false;
      }

      if (!newValidationState.msg) {
        newValidationState.msg = ``;
      }

      this.setState((prevState) => updateObject(prevState, {[inputValidationName]: newValidationState}));

      return newValidationState.isValid;
    }

    _resetValidation() {
      this.setState((prevState) => updateObject(prevState, {
        [inputValidationName]: updateObject(prevState[inputValidationName], validationInitState)
      }));
    }

    render() {
      const hocProps = {
        [inputName]: this.state[inputName],
        [inputChangeName]: this._changeInputState,
        [inputValidateName]: this._validateInputValue,
        [inputValidationName]: this.state[inputValidationName]
      };

      return (
        <WrappedComponent
          {...this.props}
          {...hocProps}
        />
      );
    }
  }

  WithInputValidation.propTypes = {};

  return WithInputValidation;
};

export default withInputValidation;

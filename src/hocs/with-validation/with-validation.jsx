import React from "react";
import PropTypes from "prop-types";
import {updateObject} from "../../utils/object/object";
import {createValidationReport} from "../../utils/validation/validation";

const withValidation = (
    inputName,
    inputValidateName,
    inputValidationName,
    resetValidationName,
    validationFn
) => (WrappedComponent) => {
  class WithValidation extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [inputValidationName]: createValidationReport(true, ``)
      };

      this._validateInputValue = this._validateInputValue.bind(this);
      this._resetValidation = this._resetValidation.bind(this);
    }

    _validateInputValue() {
      const inputValue = this.props[inputName];
      const newValidationState = validationFn(inputValue);

      this.setState((prevState) => updateObject(prevState, {[inputValidationName]: newValidationState}));
      return newValidationState.isValid;
    }

    _resetValidation() {
      this.setState((prevState) => updateObject(prevState, {[inputValidationName]: createValidationReport(true, ``)}));
    }

    render() {
      const hocProps = {
        [inputValidationName]: this.state[inputValidationName],
        [inputValidateName]: this._validateInputValue,
        [resetValidationName]: this._resetValidation
      };

      return (
        <WrappedComponent
          {...this.props}
          {...hocProps}
        />
      );
    }
  }

  WithValidation.propTypes = {
    [inputName]: PropTypes.string.isRequired
  };

  return WithValidation;
};

export default withValidation;

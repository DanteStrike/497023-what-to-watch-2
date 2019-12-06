import React from "react";
import {updateObject} from "../../utils/object/object";
import {withHandlers, withState} from "recompose";
import {compose} from "redux";
import {createValidationReport} from "../../utils/validation/validation";

const withInputValidation = (
    inputName,
    inputChangeName,
    inputInitValue,
    inputValidateName,
    inputValidationName,
    validationFn
) => (WrappedComponent) => {
  const withInput = withState(inputName, inputChangeName, inputInitValue);
  const withValidation = compose(
      withState(inputValidationName, inputValidateName, createValidationReport(true, ``)),
      withHandlers({
        inputValidateName: ({inputName: inputValue}) => () => {
          const newValidationState = validationFn(inputValue);
          inputValidateName(newValidationState);
        },
        resetValidation: () => () => {
          inputValidateName(createValidationReport(true, ``));
        }
      })
  );

  return compose(
      withInput,
      withValidation
  )(WrappedComponent);
};

export default withInputValidation;

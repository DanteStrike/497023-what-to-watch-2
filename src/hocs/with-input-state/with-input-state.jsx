import React from "react";

const withInputState = (
    inputStateName = `input`,
    inputStateChangeName = `onInputChange`,
    inputStateInitValue = ``,
    inputValidationName = `validateInput`
) => (WrappedComponent) => {
  class WithInputState extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [inputStateName]: inputStateInitValue
      };

      this._changeInputState = this._changeInputState.bind(this);
    }

    _changeInputState(newValue) {
      this.setState({[inputStateName]: newValue});
    }

    render() {
      const hocProps = {
        [inputStateChangeName]: this._changeInputState
      };

      return (
        <WrappedComponent
          {...this.props}
          {...hocProps}
        />
      );
    }
  }

  return WithInputState;
};

export default withInputState;

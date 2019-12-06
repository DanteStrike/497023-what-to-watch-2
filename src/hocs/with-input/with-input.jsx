import React from "react";

const withInput = (
    inputName,
    inputChangeName,
    inputInitValue
) => (WrappedComponent) => {
  class WithInput extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [inputName]: inputInitValue,
      };

      this._changeInputState = this._changeInputState.bind(this);
    }

    _changeInputState(newValue) {
      this.setState({[inputName]: newValue});
    }

    render() {
      const hocProps = {
        [inputName]: this.state[inputName],
        [inputChangeName]: this._changeInputState,
      };

      return (
        <WrappedComponent
          {...this.props}
          {...hocProps}
        />
      );
    }
  }

  WithInput.propTypes = {};

  return WithInput;
};

export default withInput;

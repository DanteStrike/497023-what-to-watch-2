import React from "react";
import {updateObject} from "../../utils/object/object";

const withToggleState = (
    stateName = `state`,
    stateInitValue = false,
    stateToggleName = `toggleState`
) => (WrappedComponent) => {
  class WithToggleState extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [stateName]: stateInitValue
      };

      this._stateToggle = this._stateToggle.bind(this);
    }

    _stateToggle() {
      this.setState((prevState) => updateObject(prevState, {[stateName]: !prevState[stateName]}));
    }

    render() {
      const hocProps = {
        [stateName]: this.state[stateName],
        [stateToggleName]: this._stateToggle
      };

      return (
        <WrappedComponent
          {...this.props}
          {...hocProps}
        />
      );
    }
  }

  WithToggleState.propTypes = {};

  return WithToggleState;
};

export default withToggleState;

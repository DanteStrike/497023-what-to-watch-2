import React from "react";
import Constants from "../../constants";

const withVolume = ({defaultValue, step, minVolume, maxVolume}) => (WrappedComponent) => {
  class WithVolume extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        value: defaultValue
      };

      this._updateVolume = this._updateVolume.bind(this);
    }

    _updateVolume(isUp) {
      this.setState((prevState) => {
        let value;
        const oldVolume = prevState.value;
        value = isUp ? oldVolume + step : oldVolume - step;

        if (value < minVolume) {
          value = minVolume;
        }
        if (value > maxVolume) {
          value = maxVolume;
        }

        return {
          value
        };
      });
    }

    _renderVolume() {
      const {value} = this.state;

      return (
        <p style={Constants.Styles.VOLUME_CONTAINER}>
          <small style={Constants.Styles.VOLUME_INFO}>Volume wheelUp(+) | wheelDown(-)</small>
          <strong style={Constants.Styles.VOLUME_STATE}>{value} %</strong>
        </p>
      );
    }

    render() {
      const {value} = this.state;
      const scaledVideoVolume = value / (maxVolume - minVolume);

      return (
        <WrappedComponent
          {...this.props}
          volume={scaledVideoVolume}
          updateVolume={this._updateVolume}
          renderVolume={() => this._renderVolume()}
        />
      );
    }
  }

  return WithVolume;
};

export default withVolume;

import React, {Fragment} from "react";

const withProgressBar = (WrappedComponent) => {
  class WithProgressBar extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        barPercent: 0,
        time: 0
      };

      this._updateProgressBar = this._updateProgressBar.bind(this);
    }

    _updateProgressBar(evt) {
      const mediaElement = evt.target;
      const curTime = mediaElement.currentTime;
      const duration = mediaElement.duration;
      this.setState({
        barPercent: curTime / duration * 100,
        time: curTime
      });
    }

    _renderProgressBar() {
      const {time, barPercent} = this.state;

      return (
        <Fragment>
          <div className="player__time">
            <progress className="player__progress" value={barPercent} max="100"></progress>
            <div className="player__toggler" style={{left: `${barPercent}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{time}</div>
        </Fragment>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          updateProgressBar={this._updateProgressBar}
          renderProgressBar={() => this._renderProgressBar()}
        />
      );
    }
  }

  return WithProgressBar;
};

export default withProgressBar;

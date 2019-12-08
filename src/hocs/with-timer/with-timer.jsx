import React from "react";

const withTimer = (timeout) => (WrappedComponent) => {
  class WithTimer extends React.PureComponent {
    constructor(props) {
      super(props);

      this._timeout = timeout;

      this.state = {
        timerID: null,
        isTimerFinished: false
      };

      this._handleTimerStart = this._handleTimerStart.bind(this);
      this._handleTimerReset = this._handleTimerReset.bind(this);
      this._timerFinished = this._timerFinished.bind(this);
    }

    componentWillUnmount() {
      this._handleTimerReset();
    }

    _handleTimerStart() {
      this.setState({
        timerID: setTimeout(this._timerFinished, this._timeout)
      });
    }

    _handleTimerReset() {
      const {timerID} = this.state;
      clearTimeout(timerID);
      this.setState({
        timerID: null,
        isTimerFinished: false
      });
    }

    _timerFinished() {
      this.setState({isTimerFinished: true});
    }

    render() {
      const {isTimerFinished} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          onTimerStart={this._handleTimerStart}
          onTimerReset={this._handleTimerReset}
          isTimerFinished={isTimerFinished}
        />
      );
    }
  }

  WithTimer.propTypes = {};

  return WithTimer;
};

export default withTimer;

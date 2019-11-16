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

      this._timerStartHandler = this._timerStartHandler.bind(this);
      this._timerResetHandler = this._timerResetHandler.bind(this);
      this._timerFinished = this._timerFinished.bind(this);
    }

    _timerStartHandler() {
      this.setState({
        timerID: setTimeout(this._timerFinished, this._timeout)
      });
    }

    _timerResetHandler() {
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
          onTimerStart={this._timerStartHandler}
          onTimerReset={this._timerResetHandler}
          isTimerFinished={isTimerFinished}
        />
      );
    }
  }

  WithTimer.propTypes = {};

  return WithTimer;
};

export default withTimer;

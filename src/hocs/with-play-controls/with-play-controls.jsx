import React from "react";
import Constants from "../../constants.js";

const withPlayControls = (WrappedComponent) => {
  class WithPlayControls extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }

    _handlePlayButtonClick() {
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying
        };
      });
    }

    _renderPlayButton() {
      const {isPlaying} = this.state;

      return (
        <button className="player__play" type="button" onClick={this._handlePlayButtonClick}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref={`#${isPlaying ? Constants.Icons.PAUSE : Constants.Icons.PLAY_S}`}></use>
          </svg>
          <span>{`${(isPlaying) ? `Pause` : `Play`}`}</span>
        </button>
      );
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          isActivePlayer={isPlaying}
          renderPlayButton={() => this._renderPlayButton()}
        />
      );
    }
  }

  WithPlayControls.propTypes = {};

  return WithPlayControls;
};

export default withPlayControls;

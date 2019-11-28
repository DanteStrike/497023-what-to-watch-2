import React from "react";
import {Icons} from "../../utils/enum.js";

const withPlayControls = (WrappedComponent) => {
  class WithPlayControls extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._playerButtonClickHandler = this._playerButtonClickHandler.bind(this);
    }

    _playerButtonClickHandler() {
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying
        };
      });
    }

    _renderPlayButton() {
      const {isPlaying} = this.state;

      return (
        <button className="player__play" type="button" onClick={this._playerButtonClickHandler}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref={`#${isPlaying ? Icons.PAUSE : Icons.PLAY_S}`}></use>
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

  return WithPlayControls;
};

export default withPlayControls;

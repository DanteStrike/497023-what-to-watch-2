import React from "react";
import IconsLibrary from "../../components/icons-library/icons-library.jsx";
import {Icons} from "../../utils/enum.js";

const withPlayControls = (WrappedComponent) => {
  class WithPlayControls extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        isLoading: true,
      };

      this._playerButtonClickHandler = this._playerButtonClickHandler.bind(this);
      this._canPlayThroughHandler = this._canPlayThroughHandler.bind(this);
      this._playHandler = this._playHandler.bind(this);
      this._pauseHandler = this._pauseHandler.bind(this);
    }

    _canPlayThroughHandler() {
      this.setState({isLoading: false});
    }

    _playHandler() {
      this.setState({isPlaying: true});
    }

    _pauseHandler() {
      this.setState({isPlaying: false});
    }

    _playerButtonClickHandler() {
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying
        };
      });
    }

    _renderPlayButton() {
      const {isPlaying, isLoading} = this.state;

      return (
        <button className="player__play" type="button" onClick={this._playerButtonClickHandler}>
          <IconsLibrary svgID={isPlaying ? Icons.PAUSE : Icons.PLAY_S}/>
          <span>{`${(isPlaying) ? `Pause` : `Play`}`}</span>
        </button>
      );
    }

    render() {
      const {isPlaying, isLoading} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          isActivePlayer={isPlaying}
          onPlay={this._playHandler}
          onPause={this._pauseHandler}
          onCanPlayThrough={this._canPlayThroughHandler}
          renderPlayButton={() => this._renderPlayButton()}
        />
      );
    }
  }

  return WithPlayControls;
};

export default withPlayControls;

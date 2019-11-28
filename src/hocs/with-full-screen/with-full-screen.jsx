import React from "react";
import {openFullScreen, closeFullscreen} from "../../utils/fullscreen-api/fullscreen-api.js";
import {Icons} from "../../utils/enum.js";

const withFullScreen = (WrappedComponent) => {
  class WithFullScreen extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFullScreen: false,
      };

      this._toggleFullScreen = this._toggleFullScreen.bind(this);
      this._renderFullScreen = this._renderFullScreen.bind(this);
      this._fullScreenButtonClickHandler = this._fullScreenButtonClickHandler.bind(this);
    }

    _fullScreenButtonClickHandler() {
      this.setState((prevState) => {
        return {
          isFullScreen: !prevState.isFullScreen
        };
      });
    }

    _renderFullScreen() {
      return (
        <button type="button" className="player__full-screen" onClick={this._fullScreenButtonClickHandler}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref={`#${Icons.FULL_SCREEN}`}></use>
          </svg>
          <span>Full screen</span>
        </button>
      );
    }

    _toggleFullScreen(playerElement) {
      const {isFullScreen} = this.state;

      if (isFullScreen) {
        openFullScreen(playerElement);
      } else {
        closeFullscreen();
      }
    }

    render() {
      const {isFullScreen} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          isFullScreen={isFullScreen}
          toggleFullScreen={this._toggleFullScreen}
          renderFullScreen={this._renderFullScreen}
        />
      );
    }
  }

  return WithFullScreen;
};

export default withFullScreen;

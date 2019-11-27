import React from "react";
import IconsLibrary from "../../components/icons-library/icons-library.jsx";
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
          <IconsLibrary svgID={Icons.FULL_SCREEN}/>
          <span>Full screen</span>
        </button>
      );
    }

    _toggleFullScreen(playerElement) {
      const {isFullScreen} = this.state;

      if (isFullScreen) {
        WithFullScreen.openFullScreen(playerElement);
      } else {
        WithFullScreen.closeFullscreen();
      }
    }

    static openFullScreen(playerElement) {
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      } else if (playerElement.mozRequestFullScreen) { /* Firefox */
        playerElement.mozRequestFullScreen();
      } else if (playerElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        playerElement.webkitRequestFullscreen();
      } else if (playerElement.msRequestFullscreen) { /* IE/Edge */
        playerElement.msRequestFullscreen();
      }
    }

    static closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
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

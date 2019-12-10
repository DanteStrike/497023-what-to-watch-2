import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Video from "../video/video.jsx";
import {appActions, appSelectors} from "../../reducers/app/app";
import configs from "../../configs";


class Player extends React.PureComponent {
  constructor(props) {
    super(props);

    this._playerRef = React.createRef();

    this._handlePlayerWheel = this._handlePlayerWheel.bind(this);
  }

  componentDidUpdate(prevState) {
    const {isFullScreen, toggleFullScreen} = this.props;
    const playerElement = this._playerRef.current;

    if (prevState.isFullScreen !== isFullScreen) {
      toggleFullScreen(playerElement);
    }
  }

  _handlePlayerWheel(evt) {
    const {updateVolume} = this.props;
    updateVolume(evt.deltaY < 0);
  }

  render() {
    const {
      isActivePlayer,
      videoSrc,
      volume,
      updateProgressBar,
      renderProgressBar,
      renderPlayButton,
      renderVolume,
      renderFullScreen,
      closeVideoPlayer
    } = this.props;

    return (
      <div className="player" ref={this._playerRef} onWheel={this._handlePlayerWheel}>
        {renderVolume()}
        <Video
          poster={configs.videoPlayerConfig.backgroundPoster}
          isActivePlayer={isActivePlayer}
          volume={volume}
          isMuted={false}
          src={videoSrc}
          isAutoReset={false}
          preload="metadata"
          updateProgressBar={updateProgressBar}
        />

        <button type="button" className="player__exit" onClick={closeVideoPlayer}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            {renderProgressBar()}
          </div>

          <div className="player__controls-row">
            {renderPlayButton()}
            <div className="player__name">DanteStrike</div>
            {renderFullScreen()}
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  isActivePlayer: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  updateVolume: PropTypes.func.isRequired,
  toggleFullScreen: PropTypes.func.isRequired,
  updateProgressBar: PropTypes.func.isRequired,
  renderProgressBar: PropTypes.func.isRequired,
  renderPlayButton: PropTypes.func.isRequired,
  renderFullScreen: PropTypes.func.isRequired,
  renderVolume: PropTypes.func.isRequired,
  closeVideoPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  videoSrc: appSelectors.getVideoPlayerInfo(store)
});

const mapDispatchToProps = (dispatch) => ({
  closeVideoPlayer: () => dispatch(appActions.closeVideoPlayer())
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

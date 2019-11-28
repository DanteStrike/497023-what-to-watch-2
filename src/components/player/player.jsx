import React from "react";
import PropTypes from "prop-types";
import {appActions, appSelectors} from "../../reducers/app";
import {connect} from "react-redux";
import Video from "../video/video.jsx";

const PLAYER_POSTER = `img/player-poster.jpg`;

class Player extends React.PureComponent {
  constructor(props) {
    super(props);

    this._playerRef = React.createRef();
  }

  componentDidUpdate(prevState) {
    const {isFullScreen, toggleFullScreen} = this.props;
    const playerElement = this._playerRef.current;

    if (prevState.isFullScreen !== isFullScreen) {
      toggleFullScreen(playerElement);
    }
  }

  render() {
    const {
      isActivePlayer,
      videoSrc,
      updateProgressBar,
      renderProgressBar,
      renderPlayButton,
      renderFullScreen,
      closeVideoPlayer
    } = this.props;

    return (
      <div className="player" ref={this._playerRef}>
        <Video
          poster={PLAYER_POSTER}
          isActivePlayer={isActivePlayer}
          isMuted={true}
          src={videoSrc}
          isAutoReset={false}
          preload={`metadata`}
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
  isActivePlayer: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  toggleFullScreen: PropTypes.func.isRequired,
  updateProgressBar: PropTypes.func.isRequired,
  renderProgressBar: PropTypes.func.isRequired,
  renderPlayButton: PropTypes.func.isRequired,
  renderFullScreen: PropTypes.func.isRequired,
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

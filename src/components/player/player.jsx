import React from "react";
import PropTypes from "prop-types";
import {appActions, appSelectors} from "../../reducers/app";
import {connect} from "react-redux";

const Player = (props) => {
  const {videoSrc, poster, forwardedRef, renderTimeBar, renderPlayButton, renderFullScreenButton, closeVideoPlayer} = props;

  return (
    <div className="player">
      <video ref={forwardedRef} src={videoSrc} className="player__video" poster={poster}/>

      <button type="button" className="player__exit" onClick={closeVideoPlayer}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          {renderTimeBar && renderTimeBar()}
        </div>

        <div className="player__controls-row">
          {renderPlayButton && renderPlayButton()}
          <div className="player__name">DanteStrike</div>
          {renderFullScreenButton && renderFullScreenButton()}
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  preload: PropTypes.string.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  renderTimeBar: PropTypes.func,
  renderPlayButton: PropTypes.func,
  renderFullScreenButton: PropTypes.func,
  closeVideoPlayer: PropTypes.func.isRequired
};

const mapStateToProps = (store) => ({
  videoSrc: appSelectors.getVideoPlayerInfo(store)
});

const mapDispatchToProps = (dispatch) => ({
  closeVideoPlayer: () => dispatch(appActions.closeVideoPlayer())
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

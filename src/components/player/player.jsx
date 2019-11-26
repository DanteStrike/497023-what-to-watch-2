import React from "react";
import PropTypes from "prop-types";

const Player = (props) => {
  const {poster, src, forwardedRef, renderTimeBar, renderPlayButton, renderFullScreenButton} = props;

  return (
    <div className="player">
      <video ref={forwardedRef} src={src} className="player__video" poster={poster}/>

      <button type="button" className="player__exit">Exit</button>

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
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  preload: PropTypes.string.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  renderTimeBar: PropTypes.func,
  renderPlayButton: PropTypes.func,
  renderFullScreenButton: PropTypes.func
};

export default Player;

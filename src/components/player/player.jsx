import React from "react";
import PropTypes from "prop-types";
import {appActions, appSelectors} from "../../reducers/app";
import {connect} from "react-redux";

const PLAYER_POSTER = `img/player-poster.jpg`;

class Player extends React.PureComponent {
  constructor(props) {
    super(props);

    this._playerRef = React.createRef();
  }

  componentDidUpdate(prevState) {
    const {isFullScreen, toggleFullScreen} = this.props;
    if (prevState.isFullScreen !== isFullScreen) {
      toggleFullScreen(this._playerRef.current);
    }
  }

  render() {
    const {
      videoSrc,
      renderMovie,
      renderTimeBar,
      renderPlayButton,
      renderFullScreen,
      closeVideoPlayer
    } = this.props;

    return (
      <div className="player" ref={this._playerRef}>
        {renderMovie && renderMovie(PLAYER_POSTER, videoSrc)}

        <button type="button" className="player__exit" onClick={closeVideoPlayer}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            {renderTimeBar && renderTimeBar()}
          </div>

          <div className="player__controls-row">
            {renderPlayButton && renderPlayButton()}
            <div className="player__name">DanteStrike</div>
            {renderFullScreen && renderFullScreen()}
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  renderMovie: PropTypes.func.isRequired,
  renderTimeBar: PropTypes.func,
  renderPlayButton: PropTypes.func,
  renderFullScreen: PropTypes.func,
  closeVideoPlayer: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool,
  toggleFullScreen: PropTypes.func
};

const mapStateToProps = (store) => ({
  videoSrc: appSelectors.getVideoPlayerInfo(store)
});

const mapDispatchToProps = (dispatch) => ({
  closeVideoPlayer: () => dispatch(appActions.closeVideoPlayer())
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

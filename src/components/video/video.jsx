import React from "react";
import PropTypes from "prop-types";

const trailerPreviewStyle = {
  display: `block`,
  objectFit: `fill`,
  width: `100%`,
  height: `100%`,
  position: `absolute`,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  minWidth: `100%`,
  minHeight: `100%`
};

const trailerPreviewStyleP = {
  display: `block`,
  objectFit: `fill`,
  width: `100%`,
  height: `100%`,

};

const videoPlayerStyle = {
  display: `block`,
  objectFit: `fill`,
  width: `auto`,
  height: `auto`,
  position: `absolute`,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  minWidth: `100%`,
  minHeight: `100%`
};

class Video extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {src, poster, isMuted, preload, onPlay, onPause, onCanPlayThrough} = this.props;
    const video = this._videoRef.current;

    video.preload = preload;
    video.muted = isMuted;
    video.poster = poster;
    video.controls = false;
    video.src = src;

    if (onCanPlayThrough) {
      video.addEventListener(`canplaythrough`, onCanPlayThrough);
    }

    if (onPlay) {
      video.addEventListener(`play`, onPlay);
    }

    if (onPause) {
      video.addEventListener(`pause`, onPause);
    }
  }

  componentDidUpdate() {
    const {src, isActivePlayer, isFullScreen, openFullScreen} = this.props;
    const video = this._videoRef.current;

    if (isActivePlayer) {
      this._playPromise = video.play();
    } else {
      if (this._playPromise !== undefined) {
        this._playPromise
          .then(() => {
            video.pause();

            this._resetVideo();
          });
      }
    }

    // if (isFullScreen) {
    //   openFullScreen(video);
    // }
  }

  componentWillUnmount() {
    const {onPlay, onPause, onCanPlayThrough} = this.props;
    const video = this._videoRef.current;

    video.preload = ``;
    video.muted = null;
    video.poster = ``;
    video.src = ``;

    if (onCanPlayThrough) {
      video.removeEventListener(`canplaythrough`, onCanPlayThrough);
    }

    if (onPlay) {
      video.removeEventListener(`play`, onPlay);
    }

    if (onPause) {
      video.removeEventListener(`pause`, onPause);
    }
  }

  _resetVideo() {
    const {isAutoReset} = this.props;
    const video = this._videoRef.current;

    if (isAutoReset) {
      video.currentTime = 0;
      video.load();
    }
  }

  render() {
    return (
      <video ref={this._videoRef} style={trailerPreviewStyle}/>
    );
  }
}

Video.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isActivePlayer: PropTypes.bool,
  isAutoReset: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  preload: PropTypes.string,
  isMuted: PropTypes.bool,

  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  openFullScreen: PropTypes.func
};

Video.defaultProps = {
  poster: ``,
  src: ``,
  isActivePlayer: false,
  isAutoReset: false,
  preload: `auto`,
  isMuted: true,
  isFullScreen: false
};

export default Video;

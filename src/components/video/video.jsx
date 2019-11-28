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

// const trailerPreviewStyleP = {
//   display: `block`,
//   objectFit: `fill`,
//   width: `100%`,
//   height: `100%`,
//
// };
//
// const videoPlayerStyle = {
//   display: `block`,
//   objectFit: `fill`,
//   width: `auto`,
//   height: `auto`,
//   position: `absolute`,
//   top: `50%`,
//   left: `50%`,
//   transform: `translate(-50%, -50%)`,
//   minWidth: `100%`,
//   minHeight: `100%`
// };

class Video extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {
      src,
      poster,
      isMuted,
      preload,
      updateProgressBar
    } = this.props;
    const video = this._videoRef.current;

    video.preload = preload;
    video.muted = isMuted;
    video.poster = poster;
    video.controls = false;
    video.src = src;

    if (updateProgressBar) {
      video.addEventListener(`timeupdate`, updateProgressBar);
    }
  }

  componentDidUpdate() {
    const {isActivePlayer} = this.props;
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
  }

  componentWillUnmount() {
    const {updateProgressBar} = this.props;
    const video = this._videoRef.current;

    video.preload = ``;
    video.muted = null;
    video.poster = ``;
    video.src = ``;

    if (updateProgressBar) {
      video.removeEventListener(`timeupdate`, updateProgressBar);
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
  preload: PropTypes.string,
  isMuted: PropTypes.bool,

  updateProgressBar: PropTypes.func,
};

Video.defaultProps = {
  isActivePlayer: false,
  isAutoReset: false,
  preload: `auto`,
  isMuted: true,
};

export default Video;

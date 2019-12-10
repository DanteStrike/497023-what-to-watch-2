import React from "react";
import PropTypes from "prop-types";
import Constants from "../../constants";


class Video extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
    this._isEDGE = navigator.userAgent.indexOf(`Edge`) > -1;
  }

  componentDidMount() {
    const {
      src,
      poster,
      isMuted,
      preload,
      updateProgressBar,
      volume
    } = this.props;
    const video = this._videoRef.current;

    video.preload = preload;
    video.poster = poster;
    video.controls = false;

    if (isMuted) {
      video.muted = isMuted;
    } else {
      video.volume = volume;
    }

    if (!this._isEDGE) {
      video.src = src;
    }

    if (updateProgressBar) {
      video.addEventListener(`timeupdate`, updateProgressBar);
    }
  }

  componentDidUpdate() {
    const {isActivePlayer, src, volume, isMuted} = this.props;
    const video = this._videoRef.current;

    if (isActivePlayer) {
      if (this._isEDGE && !video.src) {
        video.src = src;
      }

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

    if (!isMuted) {
      video.volume = volume;
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
      <video ref={this._videoRef} style={Constants.Styles.VIDEO_OBJECT_FIT_COVER}/>
    );
  }
}

Video.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  volume: PropTypes.number,
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

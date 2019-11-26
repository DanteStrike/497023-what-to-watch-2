import React from "react";
import PropTypes from "prop-types";

const videoPlayerStyle = {
  display: `block`,
  objectFit: `fill`,
  width: `100%`,
  height: `100%`
};

class Video extends React.PureComponent {
  componentDidMount() {
    const {src, poster, isMuted, preload} = this.props;
    const video = this._videoRef.current;

    video.preload = preload;
    video.muted = isMuted;
    video.poster = poster;
    video.src = src;
  }

  componentDidUpdate() {
    const {isActivePlayer} = this.props;
    const video = this._videoRef.current;

    if (isActivePlayer) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.preload = ``;
    video.muted = null;
    video.poster = ``;
    video.src = ``;
  }

  render() {
    return (
      <video ref={this._videoRef} style={videoPlayerStyle}/>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  isActivePlayer: PropTypes.bool.isRequired,
  preload: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};

export default Video;

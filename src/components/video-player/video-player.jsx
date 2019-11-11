import React from "react";
import PropTypes from "prop-types";

const videoPlayerStyle = {
  display: `block`,
  objectFit: `fill`,
  width: `100%`,
  height: `100%`
};

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {poster, isMuted} = this.props;
    const video = this._videoRef.current;

    video.muted = isMuted;
    video.poster = poster;
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

    video.muted = true;
    video.poster = ``;
  }

  render() {
    const {src} = this.props;

    return (
      <video ref={this._videoRef} src={src} style={videoPlayerStyle}/>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  isActivePlayer: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;

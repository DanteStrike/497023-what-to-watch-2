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

    this.state = {
      isPlaying: false,
      // isLoading: true,
      // isMuted: props.muted,
      // volume: 0
    };
  }

  componentDidMount() {
    const {src, poster, isMuted} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.muted = isMuted;
    video.poster = poster;

    // video.oncanplaythrough = () => {
    //   this.setState({isLoading: false});
    // };
    //

    video.onplay = () => {
      this.setState({isPlaying: true});
    };

    video.onpause = () => {
      this.setState({isPlaying: false});
    };
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
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
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;

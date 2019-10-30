import React from "react";
import PropTypes from "prop-types";

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    // this.state = {
    //   isPlaying: false,
    //   isLoading: true,
    //   isMuted: props.muted,
    //   volume: 0
    // };
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
    // video.onplay = () => {
    //   this.setState({isPlaying: true});
    // };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (this.props.isPlaying) {
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
    const {width, height, alt} = this.props;
    return (
      <video ref={this._videoRef} width={width} height={height} alt={alt}/>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired
};

export default VideoPlayer;

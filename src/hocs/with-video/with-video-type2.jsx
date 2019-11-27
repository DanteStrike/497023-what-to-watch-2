import React from "react";
import PropTypes from "prop-types";

const withVideo = (WrappedComponent) => {
  class WithVideo extends React.PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = React.createRef();
      this._renderVideo = this._renderVideo.bind(this);
    }

    componentDidMount() {
      const {poster, isMuted, preload, src} = this.props;
      const video = this._videoRef.current;

      video.poster = poster;
      video.isMuted = isMuted;
      video.preload = preload;
      video.src = src;
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.poster = ``;
      video.isMuted = null;
      video.preload = ``;
      video.src = ``;
    }

    _renderVideo() {
      return (
        <video ref={this._videoRef}/>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderVideo={this._renderVideo}
        />
      );
    }
  }

  WithVideo.propTypes = {
    poster: PropTypes.string.isRequired,
    isMuted: PropTypes.bool.isRequired,
    preload: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  };

  WithVideo.defaultProps = {
    poster: ``,
    isMuted: true,
    preload: `auto`,
    src: ``
  };

  return WithVideo;
};

export default withVideo;

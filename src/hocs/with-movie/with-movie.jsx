import React from "react";
import Video from "../../components/video/video.jsx";
import PropTypes from "prop-types";

const withMovie = (WrappedComponent) => {
  class WithMovie extends React.PureComponent {
    constructor(props) {
      super(props);

      this._renderMovie = this._renderMovie.bind(this);
    }

    _renderMovie(poster, src) {
      const {isActivePlayer, onCanPlayThrough, onPlay, onPause, updateProgressBar} = this.props;

      return (
        <Video
          poster={poster}
          isActivePlayer={isActivePlayer}
          isMuted={true}
          src={src}
          isAutoReset={false}
          preload={`metadata`}
          onCanPlayThrough={onCanPlayThrough}
          onPlay={onPlay}
          onPause={onPause}
          updateProgressBar={updateProgressBar}
        />
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderMovie={this._renderMovie}
        />
      );
    }
  }

  WithMovie.propTypes = {
    isActivePlayer: PropTypes.bool.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    toggleFullScreen: PropTypes.func.isRequired,
    onCanPlayThrough: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    updateProgressBar: PropTypes.func.isRequired,
  };

  return WithMovie;
};

export default withMovie;

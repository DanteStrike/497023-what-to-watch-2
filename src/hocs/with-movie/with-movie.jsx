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
      const {isActivePlayer, isFullScreen, onCanPlayThrough, onPlay, onPause, openFullScreen} = this.props;

      return (
        <Video
          poster={poster}
          isActivePlayer={isActivePlayer}
          isFullScreen={isFullScreen}
          isMuted={true}
          src={src}
          isAutoReset={false}
          preload={`metadata`}
          onCanPlayThrough={onCanPlayThrough}
          onPlay={onPlay}
          onPause={onPause}
          openFullScreen={openFullScreen}
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
    isActivePlayer: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    openFullScreen: PropTypes.func,
    onCanPlayThrough: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired
  };

  return WithMovie;
};

export default withMovie;

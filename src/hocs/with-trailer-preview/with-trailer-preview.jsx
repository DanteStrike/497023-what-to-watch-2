import React from "react";
import VideoPlayer from "../../components/video-player/video-player.jsx";
import PropTypes from "prop-types";

const withTrailerPreview = (WrappedComponent) => {
  class WithTrailerPreview extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActivePlayer: false
      };

      this._renderTrailerPreview = this._renderTrailerPreview.bind(this);
    }

    componentDidUpdate() {
      const {isTimerFinished} = this.props;

      this.setState({isActivePlayer: isTimerFinished});
    }

    _renderTrailerPreview() {
      const {poster, isMuted, previewSrc} = this.props;
      const {isActivePlayer} = this.state;

      return (
        <VideoPlayer
          poster={poster}
          isActivePlayer={isActivePlayer}
          isMuted={isMuted}
          src={previewSrc}
        />
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderTrailerPreview={this._renderTrailerPreview}
        />
      );
    }
  }

  WithTrailerPreview.propTypes = {
    poster: PropTypes.string.isRequired,
    isTimerFinished: PropTypes.bool.isRequired,
    isMuted: PropTypes.bool.isRequired,
    previewSrc: PropTypes.string.isRequired
  };

  return WithTrailerPreview;
};

export default withTrailerPreview;

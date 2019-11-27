import React from "react";
import Video from "../../components/video/video.jsx";
import PropTypes from "prop-types";

const withTrailerPreview = (WrappedComponent) => {
  class WithTrailerPreview extends React.PureComponent {
    constructor(props) {
      super(props);

      this._renderTrailerPreview = this._renderTrailerPreview.bind(this);
    }

    _renderTrailerPreview() {
      const {poster, previewSrc, isTimerFinished} = this.props;

      return (
        <Video
          poster={poster}
          isActivePlayer={isTimerFinished}
          isMuted={true}
          src={previewSrc}
          isAutoReset={true}
          preload={`none`}
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
    previewSrc: PropTypes.string.isRequired
  };

  return WithTrailerPreview;
};

export default withTrailerPreview;

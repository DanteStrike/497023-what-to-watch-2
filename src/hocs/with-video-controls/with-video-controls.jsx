import React from "react";
import PropTypes from "prop-types";

const withVideoControls = (WrappedComponent) => {
  class WithVideoControls extends React.PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = React.createRef();
      this._renderVideo = this._renderVideo.bind(this);
    }

    _renderVideo({src, poster, preload}) {
      return (
        <video
          ref={this._videoRef}
          src={src || ``}
          poster={poster || `null`}
          preload={preload || `auto`}
        />
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          videoRef={this._videoRef.current}
          renderVideo={this._renderVideo}
        />
      );
    }
  }

  WithVideoControls.PropTypes = {
    videoRef: PropTypes.element
  };

  return WithVideoControls;
};

export default withVideoControls;

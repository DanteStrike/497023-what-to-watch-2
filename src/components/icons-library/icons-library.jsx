import React from "react";
import PropTypes from "prop-types";
import {Icons} from "../../utils/enum.js";

const IconsLibrary = (props) => {
  const {svgID} = props;

  switch (svgID) {
    case Icons.ADD:
      return (
        <svg id={Icons.ADD} viewBox="0 0 19 20" width="19" height="20">
          <g fill="none" fillRule="evenodd">
            <polygon points="10.778 11.288 10.778 19.553 8.4165 19.553 8.4165 11.288 0.62793 11.288 0.62793 8.9268 8.4165 8.9268 8.4165 0.66211 10.778 0.66211 10.778 8.9268 18.566 8.9268 18.566 11.288" fill="#EEE5B5"/>
          </g>
        </svg>
      );

    case Icons.FULL_SCREEN:
      return (
        <svg id={Icons.FULL_SCREEN} viewBox="0 0 27 27" fill="none" width="27" height="27">
          <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
        </svg>
      );

    case Icons.IN_LIST:
      return (
        <svg id={Icons.IN_LIST} viewBox="0 0 18 14" fill="none" width="18" height="14">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
        </svg>
      );

    case Icons.PAUSE:
      return (
        <svg id={Icons.PAUSE} viewBox="0 0 14 21" width="14" height="21">
          <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
          </g>
        </svg>
      );

    case Icons.PLAY_S:
      return (
        <svg id={Icons.PLAY_S} viewBox="0 0 19 19" fill="none" width="19" height="19">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
        </svg>
      );

    default:
      return (
        <svg></svg>
      );
  }
};

IconsLibrary.propTypes = {
  svgID: PropTypes.string.isRequired
};

export default IconsLibrary;

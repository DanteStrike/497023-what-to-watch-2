const Time = {
  MILLISECONDS_IN_SECOND: 1000,
  MINUTES_IN_HOUR: 60,
  SECONDS_IN_MINUTE: 60,
  SECONDS_IN_HOUR: 3600
};

const RatingLevel = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`
};

const GenreFilter = {
  ALL_GENRE: `All genre`
};

const Icons = {
  ADD: `add`,
  FULL_SCREEN: `full-screen`,
  IN_LIST: `in-list`,
  PAUSE: `pause`,
  PLAY_S: `play-s`
};

const Styles = {
  NO_STYLE: {},
  NO_EVENTS: {pointerEvents: `none`},
  LOADING_CURSOR: {cursor: `wait`},
  CLEAR_LINK: {textDecoration: `none`, color: `unset`},
  FIX_FIREFOX_FLICKERING: {willChange: `transform`},
  DISPLAY_FLEX: {display: `flex`},
  MARGIN_AUTO: {margin: `auto`},
  ERROR_OUTLINE: {boxShadow: `0px 0px 0px 2px rgba(255,0,0,1)`},
  VIDEO_OBJECT_FIT_COVER: {
    position: `absolute`,
    display: `block`,
    width: `100%`,
    height: `100%`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    minWidth: `100%`,
    minHeight: `100%`,
    backgroundColor: `black`
  }
};

const RequestErrorCode = {
  TIMEOUT: `ECONNABORTED`,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
};

const Enum = {
  Time,
  RatingLevel,
  GenreFilter,
  Icons,
  Styles,
  RequestErrorCode
};
export default Enum;

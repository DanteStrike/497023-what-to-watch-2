const Time = {
  MILLISECONDS_IN_SECOND: 1000,
  MINUTES_IN_HOUR: 60,
  SECONDS_IN_MINUTE: 60,
  SECONDS_IN_HOUR: 3600
};

const RatingLevel = {
  Bad: {
    TITLE: `Bad`,
    MIN_VALUE: 0,
    MAX_VALUE: 2
  },
  Normal: {
    TITLE: `Normal`,
    MIN_VALUE: 3,
    MAX_VALUE: 4
  },
  Good: {
    TITLE: `Good`,
    MIN_VALUE: 5,
    MAX_VALUE: 7
  },
  VeryGood: {
    TITLE: `Very good`,
    MIN_VALUE: 8,
    MAX_VALUE: 9
  },
  Awesome: {
    TITLE: `Awesome`,
    VALUE: 10,
  }
};

const GenreFilter = {
  ALL_GENRE: `All genre`
};

const Icon = {
  ADD: `add`,
  FULL_SCREEN: `full-screen`,
  IN_LIST: `in-list`,
  PAUSE: `pause`,
  PLAY_S: `play-s`
};

const Style = {
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
  },
  MARGIN_BOTTOM: {marginBottom: `60px`},
  RETRY_BUTTON: {
    margin: `auto`,
    border: `1px solid rgba(217,205,141,.41)`,
    borderRadius: `8px`,
    transition: `border-color .2s`,
    fontSize: `30px`,
    lineHeight: `44px`,
    textAlign: `center`,
    color: `#d9cd8d`,
    cursor: `pointer`,
  },
  VOLUME_CONTAINER: {
    position: `absolute`,
    zIndex: `10`,
    top: `5px`,
    left: `5px`,
    margin: `0`,
    padding: `0`,
    color: `#eee5b5`,
    fontSize: `12px`
  },
  VOLUME_INFO: {
    fontSize: `12px`
  },
  VOLUME_STATE: {
    display: `block`,
    fontSize: `16px`
  }
};

const RequestErrorCode = {
  TIMEOUT: `ECONNABORTED`,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
};

const Constants = {
  Time,
  RatingLevel,
  GenreFilter,
  Icon,
  Style,
  RequestErrorCode
};
export default Constants;

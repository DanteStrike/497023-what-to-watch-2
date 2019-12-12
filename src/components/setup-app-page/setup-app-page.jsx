import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Constants from "../../constants";
import {appActions, appOperations, appSelectors} from "../../reducers/app/app";


const SetupAppPage = (props) => {
  const {setupAppError, onRepeatSetupClick} = props;

  return (
    <div className="user-page">
      {setupAppError.isError && <div className="user-page__content" style={Constants.Style.DISPLAY_FLEX}>
        <div style={Constants.Style.MARGIN_AUTO}>
          <h1>Something goes wrong on setup App</h1>
          {setupAppError.code && <p>Error code: {setupAppError.code}</p>}
          <p style={Constants.Style.MARGIN_BOTTOM}>{setupAppError.msg}</p>
          <button className="btn" style={Constants.Style.RETRY_BUTTON} onClick={onRepeatSetupClick}>Retry</button>
        </div>
      </div>}
    </div>
  );
};

SetupAppPage.propTypes = {
  setupAppError: PropTypes.exact({
    isError: PropTypes.bool.isRequired,
    code: PropTypes.number,
    msg: PropTypes.string,
  }),
  onRepeatSetupClick: PropTypes.func.isRequired
};

const mapStateToProps = (store) => ({
  setupAppError: appSelectors.getSetupAppError(store)
});

const mapDispatchToProps = (dispatch) => ({
  onRepeatSetupClick: () => {
    dispatch(appActions.resetSetupAppError());
    dispatch(appOperations.setupApp());
  }
});

export {SetupAppPage};
export default connect(mapStateToProps, mapDispatchToProps)(SetupAppPage);

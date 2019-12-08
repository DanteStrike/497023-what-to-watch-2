import axios from "axios";
import Constants from "./constants.js";
import {userActions} from "./reducers/user/user";

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/wtw`,
    timeout: 5 * Constants.Time.MILLISECONDS_IN_SECOND,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.code === Constants.RequestErrorCode.TIMEOUT) {
      throw err;
    }

    if (!err.response) {
      throw err;
    }

    if (err.response.status === Constants.RequestErrorCode.UNAUTHORIZED || err.response.status === Constants.RequestErrorCode.FORBIDDEN) {
      dispatch(userActions.setAuthRequired());
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;

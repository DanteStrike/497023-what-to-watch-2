import axios from "axios";
import Enum from "./enum.js";
import {userActions} from "./reducers/user/user";

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/wtw`,
    timeout: 5 * Enum.Time.MILLISECONDS_IN_SECOND,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.code === Enum.RequestErrorCode.TIMEOUT) {
      throw err;
    }

    if (!err.response) {
      throw err;
    }

    if (err.response.status === Enum.RequestErrorCode.UNAUTHORIZED || err.response.status === Enum.RequestErrorCode.FORBIDDEN) {
      dispatch(userActions.setAuthRequired());
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;

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
    if (err.code === `ECONNABORTED`) {
      throw err;
    }

    if (err.response.status === 401 || err.response.status === 403) {
      dispatch(userActions.setAuthRequired());
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;

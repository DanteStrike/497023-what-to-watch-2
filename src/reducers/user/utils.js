const URL_FIX = `http://htmlacademy-react-2.appspot.com`;

const adaptUserProfile = (userProfileRAW) => ({
  id: userProfileRAW[`id`] || null,
  email: userProfileRAW[`email`],
  name: userProfileRAW[`name`],
  avatarUrl: URL_FIX + userProfileRAW[`avatar_url`]
});

const getIDsList = (myListFilmsRAW) => {
  return myListFilmsRAW.reduce((IDsList, filmRAW) => {
    IDsList.push(filmRAW[`id`]);
    return IDsList;
  }, []);
};

const decodeServerErrMsg = (serverErrorMsg) => {
  let result = {
    target: ``,
    msg: serverErrorMsg
  };

  const targetRegex = /child "([a-zA-Z]*)"/gm;
  const targetMatch = targetRegex.exec(serverErrorMsg);
  if (targetMatch) {
    result.target = targetMatch[1];
  }

  const errorMsgRegex = /\[(.*)]/gm;
  const errorMsgMatch = errorMsgRegex.exec(serverErrorMsg);
  if (errorMsgMatch) {
    result.msg = errorMsgMatch[1];
  }

  return result;
};

export default {
  adaptUserProfile,
  getIDsList,
  decodeServerErrMsg
};

export const formatServerErrorMsg = (serverErrorMsg) => {
  let result = {
    type: ``,
    msg: serverErrorMsg
  };

  const typeRegex = /child "([a-zA-Z]*)"/gm;
  const typeMatch = typeRegex.exec(serverErrorMsg);
  if (typeMatch) {
    result.type = typeMatch[1];
  }

  const errorMsgRegex = /\[(.*)]/gm;
  const errorMsgMatch = errorMsgRegex.exec(serverErrorMsg);
  if (errorMsgMatch) {
    result.msg = errorMsgMatch[1];
  }

  return result;
};

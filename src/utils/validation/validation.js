export const getIsValidFormatEmail = (email) => {
  if (email === ``) {
    return {
      isValid: false,
      msg: `Form: Please enter email address`
    };
  }

  const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!(emailFormatRegex.test(email))) {
    return {
      isValid: false,
      msg: `Form: Please enter a valid email address`
    };
  }

  return {
    isValid: true,
    msg: ``
  };
};


export const getIsValidFormatPassword = (password) => {
  if (password === ``) {
    return {
      isValid: false,
      msg: `Form: Please enter password`
    };
  }

  return {
    isValid: true,
    msg: ``
  };
};

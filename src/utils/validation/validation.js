export const createValidationReport = (isValid, msg) => ({
  isValid,
  msg
});

export const checkEmail = (email) => {
  if (email === ``) {
    return createValidationReport(false, `Form: Please enter email address`);
  }

  const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!(emailFormatRegex.test(email))) {
    return createValidationReport(false, `Form: Please enter a valid email address`);
  }

  return createValidationReport(true, ``);
};


export const checkPassword = (password) => {
  if (password === ``) {
    return createValidationReport(false, `Form: Please enter password`);
  }

  return createValidationReport(true, ``);
};

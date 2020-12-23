const validateEmail = (email) => {
  const emailToValidate = email;
  const emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (emailRegexp.test(emailToValidate)) {
    console.log("valid");
    return true;
  } else {
    return false;
  }
};
module.exports = validateEmail;

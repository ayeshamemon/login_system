const validatePassword = (password) => {
  var passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (passwordRegexp.test(password)) {
    console.log("Valid");
    return true;
  } else {
    console.log("Not valid");
    return false;
  }
};

module.exports = validatePassword;

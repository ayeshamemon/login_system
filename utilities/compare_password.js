const bcrypt = require("bcrypt");
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password.toString(), hashedPassword);
};

module.exports = comparePassword;

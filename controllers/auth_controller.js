const bcrypt = require("bcrypt");
const comparePassword = require("../utilities/compare_password");
const validateEmail = require("../utilities/validate_email");
const validatePassword = require("../utilities/validate_password");
const connection = require("../utilities/db_config");
const UserModel = require("../models/user_models");

class AuthController {
  constructor() {
    this.user = new UserModel();
  }
  hashString = async (string) => {
    return await bcrypt.hash(string.toString(), 10);
  };

  register = async (req, res) => {
    const { email, password } = req.body;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      //if email and password is valid then go inside and register the user

      try {
        const hashedPassword = await this.hashString(password);

        connection.then(async () => {
          const result = await UserModel.create({
            email,
            password: hashedPassword,
          });
          console.log(result);
          // const item = new UserModel({ email, password: hashedPassword });
          // item.save((err, data) => {
          //   console.log(err, data);
          //   console.log(hashedPassword);
          // });
        });
        return res.status(200).send({ message: "Register Successful" });
      } catch (err) {
        return res.status(400).json(err);
      }
    } else {
      //give the message to enter a valid email or valid password
      const message = {};
      if (!isEmailValid) {
        message.email = "Please enter a valid email!";
      }
      if (!isPasswordValid) {
        message.password =
          "Please enter a password of 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
      }

      return res
        .status(400)
        .send({ message: message.email || message.password });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    connection.then(async () => {
      try {
        const result = await UserModel.findOne({ email: email }).exec();
        console.log(result);
        if (!result) {
          return res.status(400).send({ message: "Email doesnt exist" });
        }
        const isPasswordEqual = await comparePassword(
          password,
          result && result.password
        );

        res
          .status(200)
          .send(
            isPasswordEqual ? "Login Successful" : "Login failed.Check Password"
          );
      } catch (err) {
        console.log(err);
      }
    });
  };
}
module.exports = AuthController;

//used mongodb native database:
// try {
// const result = await this.user.createUser(email, hashedPassword);
//   const result = await this.user.getPasswordFromEmail(email);
//
// } catch (err) {
//   console.log(err);
// }

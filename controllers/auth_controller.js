const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const comparePassword = require("../utilities/compare_password");
const validateEmail = require("../utilities/validate_email");
const validatePassword = require("../utilities/validate_password");
const connection = require("../utilities/db_config");
const UserModel = require("../models/user_models");
const AuthService = require("../services/auth_services");
const { collection } = require("../models/user_models");
const authService = new AuthService();

class AuthController {
  constructor() {
    //this.user = new UserModel();
  }
  hashString = async (string) => {
    return await bcrypt.hash(string.toString(), 10);
  };

  registerUser = async (req, res) => {
    const { email, password, gender, address } = req.body;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      //if email and password is valid then go inside and register the user

      try {
        const hashedPassword = await this.hashString(password);
        const registeredUser = await authService.registerUserService(
          email,
          hashedPassword,
          gender,
          address
        );
        return res
          .status(200)
          .json({ message: "Register Successful", registeredUser });
      } catch (err) {
        return res.status(400).json(err.message);
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

  updateUserAddress = async (req, res) => {
    const { email, address } = req.body;
    const isEmailValid = validateEmail(email);
    //TODO : Validate the address
    if (isEmailValid) {
      try {
        const foundUserByEmail = await authService.findUserByEmailService(
          email
        );
        console.log({ foundUserByEmail });
        if (!foundUserByEmail) {
          return res.status(400).json({ message: "The email doesnt exist" });
        }

        const updatedAddressDetails = await authService.updateUserAddressService(
          email,
          address
        );
        console.log({ updatedAddressDetails });
        const {
          updatedUserAddressReference,
          savedUserAddress,
        } = updatedAddressDetails;

        if (
          updatedUserAddressReference.nModified === 1 &&
          savedUserAddress._id
        ) {
          return res.status(200).json({
            message: "The address is updated successfully",
            savedUserAddress,
          });
        }

        return res
          .status(400)
          .json({ message: "Failed to update the address" });
      } catch (e) {
        console.log(e);
      }
    } else {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
  };

  deleteUserAddress = async (req, res) => {
    const { email, id } = req.body;
    const isEmailValid = validateEmail(email);
    //TODO : Validate the id
    if (isEmailValid) {
      try {
        const foundUserByEmail = await authService.findUserByEmailService(
          email
        );
        console.log({ foundUserByEmail });
        if (!foundUserByEmail) {
          return res.status(400).json({ message: "The email doesnt exist" });
        }
        const deletedAddressDetails = await authService.deleteUserAddressService(
          email,
          id
        );

        console.log({ deletedAddressDetails });
        const {
          deleteUserAddress,
          deletedUserAddressReference,
        } = deletedAddressDetails;
        if (
          deleteUserAddress.deletedCount === 1 &&
          deletedUserAddressReference.nModified === 1
        ) {
          return res
            .status(200)
            .json({ message: "Address deleted successfully" });
        } else {
          return res
            .status(200)
            .json({ message: "Failed to delete the Address" });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const allUsersData = await authService.getAllUsersSevice();
      res.status(200).send({ allUsersData });
    } catch (e) {
      console.log(e);
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const isEmailValid = validateEmail(email);
    // connection.then(()=>{
    //   UserModel.findOne({ email: email }).exec().then((result) =>  {
    //
    //   const isPasswordEqual = await comparePassword(
    //     password,
    //     result.password
    //   );

    //   res
    //     .status(200)
    //     .send(
    //       isPasswordEqual ? "Login Successful" : "Login failed.Check Password"
    //     );
    // }).catch(() => res.status(400).send({ message: "Email doesnt exist" }))

    //to use of its a singleton class in db config
    // const con = new DBConnection();
    // const connection = await con.getInstance();
    if (isEmailValid) {
      const token = jwt.sign(req.body, "Ayesha", { expiresIn: "2d" });
      console.log(token);
      try {
        let result = await authService.loginService(email);
        console.log({ result });
        if (!result.email) {
          return res.status(400).send({ message: "Email doesnt exist" });
        }
        const isPasswordEqual = await comparePassword(
          password,
          result.password
        );

        if (isPasswordEqual) {
          return res
            .status(200)
            .json({ message: "Login Successful", token: token });
        } else {
          return res.status(400).json({ message: "Login failed" });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(400).json({ message: "Please enter a valid email " });
    }
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
//

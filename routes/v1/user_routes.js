const express = require("express");
const router = express.Router();

const AuthController = require("../../controllers/auth_controller");
const authController = new AuthController();
const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} ${req.url}`);
  next();
};

// const updateMiddleware = (req, res, next) => {
//   console.log("I am update Middleware");
//   next();
// };

// const deleteMiddleware = (req, res, next) => {
//   console.log("I am delete Middleware");
//   next();
// };

router.post("/login", loggerMiddleware, authController.login);
router.post("/register", loggerMiddleware, authController.registerUser);
router.put("/address", authController.updateUserAddress);
router.delete("/address", authController.deleteUserAddress);
router.get("/all_users", authController.getAllUsers);

module.exports = router;

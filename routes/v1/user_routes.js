const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const AuthController = require("../../controllers/auth_controller");
const authController = new AuthController();

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} ${req.url}`);
  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.body.token;
  console.log("Auth middleware");
  jwt.verify(token, "Ayesha", (err, decoded) => {
    if (err) {
      return res.status(400).send({ message: "Please login", err: err });
    }
    next();
  });
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
router.put("/address", authMiddleware, authController.updateUserAddress);
router.delete("/address", authMiddleware, authController.deleteUserAddress);
router.get("/all_users", authMiddleware, authController.getAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth_controller");
const authController = new AuthController();

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} ${req.url}`);
  next();
};
router.get("/", (req, res) => {
  res.status(200);
  res.send("hii ayesha");
});

router.post("/login", loggerMiddleware, authController.login);

module.exports = router;

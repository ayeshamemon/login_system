const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth_controller");
// const UpdateController = require("../../controllers/update_controller");
// const DeleteController = require("../../controllers/delete_controller");
const authController = new AuthController();
// const updateController = new UpdateController();
// const deleteController = new DeleteController();

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} ${req.url}`);
  next();
};

const updateMiddleware = (req, res, next) => {
  console.log("I am update Middleware");
  next();
};

const deleteMiddleware = (req, res, next) => {
  console.log("I am delete Middleware");
  next();
};

router.get("/", (req, res) => {
  res.status(200);
  res.send("hii ayesha");
});
router.post("/login", loggerMiddleware, authController.login);
router.post("/register", loggerMiddleware, authController.register);
// router.put("/update", updateMiddleware, updateController.update);
// router.delete("/delete", deleteMiddleware, deleteController.delete);

router.all("*", (req, res) => {
  res.status(404).send({ message: "The server is not able to find the page" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const userRouter = require("./user_routes");
router.use("/", userRouter);

router.all("*", (req, res) => {
  res.status(404).send({ message: "The server is not able to find the page" });
});

module.exports = router;

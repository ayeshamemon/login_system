const express = require("express");
const router = require("./v1");
const rootRouter = express.Router();

rootRouter.use("/v1", router);
// rootRouter.use("/v2", router);

rootRouter.all("*", (req, res) => {
  res.status(404).send("The server is not able to find the page");
});
module.exports = rootRouter;

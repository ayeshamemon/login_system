const express = require("express");
const router = require("./v1");
const rootRouter = express.Router();

rootRouter.use("/v1", router);
// rootRouter.use("/v2", router);

module.exports = rootRouter;

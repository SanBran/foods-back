const dietsRouter = require("express").Router();
const getDietsHandler = require("../handlers/getDietsHandler");

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;

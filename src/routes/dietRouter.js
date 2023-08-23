const dietsRouter = require("express").Router();
const getDietsHandler = require("../handlers/getDietsHandler");

dietsRouter.post("/", getDietsHandler);

module.exports = dietsRouter;

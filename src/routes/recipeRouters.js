const routerRecipe = require("express").Router();
const {
  getRecipeByIdHandler,
  createRecipeHandler,
  getRecipeByNameHandler,
} = require("../handlers/recipesHandlers");

routerRecipe.post("/:idRecipe", getRecipeByIdHandler);
routerRecipe.post("/", getRecipeByNameHandler);
routerRecipe.post("/", createRecipeHandler);

module.exports = routerRecipe;

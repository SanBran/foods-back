const routerRecipe = require("express").Router();
const {
  getRecipeByIdHandler,
  createRecipeHandler,
  getRecipeByNameHandler,
} = require("../handlers/recipesHandlers");

routerRecipe.get("/:idRecipe", getRecipeByIdHandler);
routerRecipe.get("/", getRecipeByNameHandler);
routerRecipe.post("/", createRecipeHandler);

module.exports = routerRecipe;

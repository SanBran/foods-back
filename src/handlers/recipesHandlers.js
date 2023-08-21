const getRecipeById = require("../controllers/getRecipeById");
const createRecipe = require("../controllers/createRecipe");
const getAllRecipes = require("../controllers/getAllRecipes");
const getRecipeByName = require("../controllers/getRecipeByName");

const getRecipeByIdHandler = async (req, res) => {
  const { idRecipe } = req.params;

  const source = isNaN(idRecipe) ? "bdd" : "api";

  try {
    const recipeId = await getRecipeById(idRecipe, source);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const response = name ? await getRecipeByName(name) : await getAllRecipes();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipeHandler = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;

  try {
    if (!name || !image || !summary || !healthScore || !steps)
      res.status(400).json({ message: "Missing data" });

    const response = await createRecipe(
      name,
      image,
      summary,
      healthScore,
      steps,
      diets
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipeByIdHandler,
  createRecipeHandler,
  getRecipeByNameHandler,
};

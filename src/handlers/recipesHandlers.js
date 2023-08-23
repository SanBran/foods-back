const getRecipeById = require("../controllers/getRecipeById");
const createRecipe = require("../controllers/createRecipe");
const getAllRecipes = require("../controllers/getAllRecipes");
const readRecipeByQuery = require("../controllers/getRecipeByQuery");

const getRecipeByIdHandler = async (req, res) => {
  const { idRecipe } = req.params;

  try {
    const recipeId = await getRecipeById(idRecipe);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByNameHandler = async (req, res) => {
  let { page } = req.query;
  const querys = req.body;
  const querysNum = Object.keys(querys).length;

  try {
    if (querysNum == 0) {
      const response = await getAllRecipes(page);
      res.status(200).json(response);
    } else {
      const response = await readRecipeByQuery(
        querys,
        page ? page : (page = 1)
      );
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipeHandler = async (req, res) => {
  const { title, image, summary, healthScore, steps, diets } = req.body;

  try {
    if (!title || !image || !summary || !healthScore || !steps)
      res.status(400).json({ message: "Missing data" });

    const response = await createRecipe(
      title,
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

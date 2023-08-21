const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const { cleanArrayDb, cleanArrayApi } = require("../utils/utils");

const getAllRecipes = async () => {
  const recipesDb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const recipesApi = (
    await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const dataBaseRecipes = cleanArrayDb(recipesDb);
  const apiRecipes = cleanArrayApi(recipesApi);

  return [...dataBaseRecipes, ...apiRecipes];
};

module.exports = getAllRecipes;

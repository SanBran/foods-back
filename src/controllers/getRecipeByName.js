const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { cleanArrayApi, cleanArrayDb } = require("../utils/utils");

const getRecipeByName = async (name) => {
  const dataBaseRecipesInfo = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dataBaseRecipes = cleanArrayDb(dataBaseRecipesInfo);
  const apiRecipesInfo = (
    await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;
  const apiRecipes = cleanArrayApi(apiRecipesInfo);

  const filterApiRecipes = apiRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );

  if ([...dataBaseRecipes, ...filterApiRecipes].length) {
    return [...dataBaseRecipes, ...filterApiRecipes];
  } else {
    throw new Error(`The recipe: ${name} not exist. Try with another name.`);
  }
};
module.exports = getRecipeByName;

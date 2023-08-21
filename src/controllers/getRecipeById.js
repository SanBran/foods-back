const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const { cleanResApi, cleanResDatabase } = require("../utils/utils");

const getRecipeById = async (id, source) => {
  if (source === "api") {
    const response = (
      await axios(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
    ).data;
    return cleanResApi(response);
  } else {
    const recipeDb = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (recipeDb) {
      return cleanResDatabase(recipeDb);
    } else {
      return `Coudn't find the recipe with id: ${id}. Please try with another id.`;
    }
  }
};

module.exports = getRecipeById;

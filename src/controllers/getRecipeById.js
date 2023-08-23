require("dotenv").config();
const { Recipe, Diet } = require("../db");
const { cleanResDatabase } = require("../utils/utils");

const getRecipeById = async (id) => {
  const recipeDb = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["title"],
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
};

module.exports = getRecipeById;

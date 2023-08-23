const { Recipe, Diet } = require("../db");
const { cleanArrayDb } = require("../utils/utils");

const getAllRecipes = async (page = 1) => {
  const limit = process.env.PAGES_ITEMS;
  const offset = (page - 1) * limit;

  const recipesDb = await Recipe.findAll({
    offset: offset,
    limit: limit,
    order: [["title", "ASC"]],
    include: {
      model: Diet,
      attributes: ["title"],
      through: {
        attributes: [],
      },
    },
  });

  const dataBaseRecipes = cleanArrayDb(recipesDb);

  return dataBaseRecipes;
};

module.exports = getAllRecipes;

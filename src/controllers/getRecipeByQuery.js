const axios = require("axios");
require("dotenv").config();
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const readRecipeByQuery = async (querys, page) => {
  try {
    const whereCondition = {};
    const keyValues = [
      "name",
      "healthScore",
      "healtScoreRange",
      "diets",
      "created",
    ];

    Object.entries(querys).forEach(([key, value]) => {
      switch (key) {
        case "healthScoreRange": {
          const [hS1, hS2] = value.split("-");
          whereCondition["healthScore"] = { [Op.between]: [hS1, hS2] };
          break;
        }

        default:
          keyValues.includes(key)
            ? (whereCondition[key] = value)
            : (whereCondition[key] = { [Op.iLike]: `%${value}%` });
      }
    });

    const pageSize = parseInt(process.env.PAGES_ITEMS);
    const offset = (parseInt(page) - 1) * pageSize;

    const { rows: findRecipe, count: totalRecipes } =
      await Book.findAndCountAll({
        offset: offset,
        limit: pageSize,
        where: whereCondition,
        order: [["title", "ASC"]],
        include: [{ model: Diet, as: "diets" }],
      });

    if (findRecipe.length > 0) {
      const totalPages = Math.ceil(totalRecipes / pageSize);
      return { totalPages: totalPages, book: findRecipe };
    } else {
      return { mensaje: "No matches found" };
    }
  } catch (error) {}
  console.log(error.message);
  throw new Error(error.message);
};
module.exports = readRecipeByQuery;

require("dotenv").config();
const { Diet, Recipe } = require("../db");
const cleanArrayDb = require("../utils/utils");

const getDiets = async () => {
  const dietsDb = await Diet.findAll({
    order: [["title", "ASC"]],
  });

  return dietsDb;
};

module.exports = getDiets;

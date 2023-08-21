const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Diet } = require("../db");

const getDiets = async () => {
  const response = (
    await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  let diets = [];

  response.forEach((e) => {
    diets = [...diets, Object.keys(e).shift()];
    diets = [...diets, ...e.diets];
  });

  diets = [...new Set(diets)];

  const resultsFunction = async (diets) => {
    for (let diet of diets) {
      await Diet.findOrCreate({ where: { name: diet } });
    }
  };

  await resultsFunction(diets);
  return await Diet.findAll();
};

module.exports = getDiets;

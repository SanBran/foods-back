const { Recipe, Diet } = require("../db");

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets
) => {
  let newRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    steps,
  });

  let dietas = await Diet.findAll({
    where: {
      name: diets,
    },
  });

  await newRecipe.addDiet(dietas);

  return "Recipe crated";
};

module.exports = createRecipe;

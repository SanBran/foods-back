const { Recipe, Diet } = require("../db");

const createRecipe = async (
  title,
  image,
  summary,
  healthScore,
  steps,
  diets
) => {
  let newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    steps,
    diets,
  });

  let dietas = await Diet.findAll({
    where: {
      title: diets,
    },
  });

  await newRecipe.addDiet(dietas);

  return "Recipe crated";
};

module.exports = createRecipe;

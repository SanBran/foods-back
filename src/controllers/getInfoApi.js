const axios = require("axios");

const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const getInfoApi = async () => {
  const verifyDb = await Recipe.count();

  if (verifyDb === 0) {
    const recipesApi = (
      await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data.results;

    let diets = [];

    recipesApi.forEach((e) => {
      diets = [...diets, Object.keys(e).shift()];
      diets = [...diets, ...e.diets];
    });

    diets = [...new Set(diets)];

    const resultsFunction = async (diets) => {
      for (let diet of diets) {
        await Diet.findOrCreate({ where: { title: diet } });
      }
    };

    await resultsFunction(diets);

    const cleanRecipes = await recipesApi.map((e) => {
      let steps = e.steps ? e.steps[0] : null;
      let newRecipe = Recipe.create({
        id: e.cca3,
        title: e.title,
        image: e.image,
        summary: e.summary,
        healthScore: e.healthScore,
        diets: e.diets,
        steps: e.analyzedInstructions[0]?.steps.map((e) => e.step).join(" "),
        created: false,
      });
    });
  } else {
    return;
  }
};

module.exports = getInfoApi;

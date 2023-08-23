const cleanResApi = (res) => {
  const clean = {
    id: res.id,
    title: res.title,
    image: res.image,
    summary: res.summary,
    healthScore: res.healthScore,
    diets: res.diets,
    steps: res.analyzedInstructions[0]?.steps.map((e) => e.step).join(" "),
    created: false,
  };

  return clean;
};

const cleanResDatabase = (res) => {
  const clean = {
    id: res.id,
    title: res.title,
    image: res.image,
    summary: res.summary,
    healthScore: res.healthScore,
    diets: res.diets?.map((e) => e.title),
    steps: res.steps,
    created: true,
  };

  return clean;
};

const cleanArrayDb = (arr) => {
  const clean = arr.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      summary: e.summary,
      healthScore: e.healthScore,
      diets: e.diets?.map((e) => e.title),
      steps: e.steps,
      created: true,
    };
  });
  return clean;
};

const cleanArrayApi = (arr) => {
  const clean = arr.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      summary: e.summary,
      healthScore: e.healthScore,
      diets: e.diets,
      steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
      created: false,
    };
  });
  return clean;
};

module.exports = { cleanResApi, cleanResDatabase, cleanArrayDb, cleanArrayApi };

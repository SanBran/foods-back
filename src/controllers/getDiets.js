require("dotenv").config();
const { Diet } = require("../db");

const getDiets = async () => {
  const dietsDb = await Diet.findAll({
    order: [["title", "ASC"]],
    include: {
      model: Recipe,
      attributes: ["title"],
      through: {
        attributes: [],
      },
    },
  });

  const dataBaseDiets = cleanArrayDb(dietsDb);

  return dataBaseDiets;
};

module.exports = getDiets;

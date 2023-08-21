const getDiets = require("../controllers/getDiets");

const getDietsHandler = async (req, res) => {
  try {
    const diets = await getDiets();
    res.status(200).json(diets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDietsHandler;

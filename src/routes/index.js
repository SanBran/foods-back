const { Router } = require("express");
const routerRecipe = require("./recipeRouters");
const dietsRouter = require("./dietRouter");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", routerRecipe);
router.use("/diets", dietsRouter);

module.exports = router;

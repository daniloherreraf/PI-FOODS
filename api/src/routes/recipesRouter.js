const { Router } = require("express");
const { 
    getRecipesHandler, 
    getRecipeHandler, 
    createRecipeHandler,
} = require("../handlers/recipesHandler");

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", getRecipeHandler);

recipesRouter.post("/", createRecipeHandler);


module.exports = recipesRouter;
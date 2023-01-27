const {
    getAllInfo,
    searchRecipeByName,
    getInfoById,
    postCreateRecipe,

 } = require("../controllers/recipesController");



const getRecipesHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const results = name ? await searchRecipeByName(name) : await getAllInfo();
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({error: error.message})
    }

};

const getRecipeHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const recipeId = await getInfoById(id);
        res.status(201).json(recipeId);     
    } catch (error) {
        res.status(404).json({error: error.message})        
    }
};

const createRecipeHandler = async (req, res) => {
    const { name, summary,  score, healthScore, image, steps, createdInDb,  diets } = req.body;
    
    try {
        if(!name || !summary ) {
            return res.status(404).send("Error to create recipe is required name and summary")
        } else {
            const createRecipe = await postCreateRecipe({name, summary, score, healthScore, image, steps, createdInDb, diets})
            return res.status(201).json(createRecipe);
      }  
    } catch (error) {
        res.status(404).json({error: error.message})        
    }   
};

    module.exports = {
        getRecipesHandler, 
        getRecipeHandler, 
        createRecipeHandler,
    };








    //
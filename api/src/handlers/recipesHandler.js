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
        if(results.length === 0) {
            return res.status(404).send(`No existe receta con ese nombre: ${name}`)
        } else {
           
            return res.status(200).json(results);
        }
        
    } catch (error) {
       res.status(404).json({error:error.message}) 
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
    const { name, summary, healthScore, image, steps, types, createdInDb,  diets } = req.body;
    
    try {
        const recipesApiDB = await getAllInfo();
        const recipeName = recipesApiDB.find(recipe => recipe.name === name)
        if(recipeName) {
            return res.status(404).send(`the recipe with the ${name} already exists`)
        } else if(!name || !summary ) {
            return res.status(404).send("Error to create recipe is required name and summary")
        } else {
            const createRecipe = await postCreateRecipe({name, summary, healthScore, image, steps, types, createdInDb, diets})
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
const { Recipe, Diet, } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { MY_API_KEY } = process.env;

const getApiInfo = async () => {

    const resUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_API_KEY}&addRecipeInformation=true&number=5`);
    const { results } = resUrl.data 
    let response = await results?.map((result) => {
            return {
                name: result.title,
                vegetarian: result.vegetarian,
                vegan: result.vegan,
                glutenFree: result.glutenFree,
                dairyFree: result.dairyFree, 
                image: result.image, 
                id: result.id, 
                score: result.spoonacularScore,
                healthScore: result.healthScore,
                types: result.dishTypes?.map(element => element),  
                diets: result.diets?.map(element => element), 
                summary: result.summary, 
                steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):''),
                created: false
            }       
        });

        return response;
}; 

   
const getDBInfo = async () => {
    return await Recipe.findAll({ 
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    });
};


const getAllInfo = async () => {
    const dbRecipes = await getDBInfo();
    const recipesApi = await getApiInfo();


    return [...dbRecipes, ...recipesApi];

};

const getRecipesDbByName = async (name) => {
    const recipeByName = await Recipe.findAll({
        where:{
            name: { [Op.iLike]: `%${name}%` },
        },
    });
      return recipeByName;
};

const getRecipesByNameApi = async (name) => {
    
    const recipes = await getApiInfo();
    const filtered = recipes.filter((element) => element.name.toLowerCase().includes(name.toLowerCase()));
    console.log(filtered)
    return filtered;
};


const searchRecipeByName = async (name) => { 

    const apiInfo = await getRecipesByNameApi(name);
    const dbInfo = await getRecipesDbByName(name);

    return [...apiInfo, ...dbInfo]
};


const getInfoById = async (id) => {
    console.log(id)
  const recipes = await getAllInfo()
  console.log(recipes)
  let recipeId = await recipes.filter((element) => element.id == id)
  return recipeId  
};


const postCreateRecipe = async ({name, summary, score, healthScore, image, steps, createdInDb, diets}) => {
    let recipeCreate = await Recipe.create({name, summary, score, healthScore, image, steps, createdInDb});
            let dietDB = await Diet.findAll({ 
                where: { name: diets }
            });
            recipeCreate.addDiet(dietDB);
            
            return recipeCreate
};



module.exports = {
      getAllInfo,
      getInfoById,
      postCreateRecipe,
      searchRecipeByName

};

//
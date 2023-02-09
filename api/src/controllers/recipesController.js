const { Recipe, Diet, } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { MY_API_KEY } = process.env;

const getApiInfo = async () => {

    const resUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_API_KEY}&addRecipeInformation=true&number=60`);
    const { results } = resUrl.data 
    let response = await results?.map((result) => {
            return {
                name: result.title,
                image: result.image, 
                id: result.id, 
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
    const recipes =  await Recipe.findAll({ 
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    });
    let response = await recipes.map((element) =>{
        return {
            id: element.id,
            name: element.name,
            summary: element.summary,
            steps: element.steps,
            types: element.types,
            healthScore: element.healthScore,
            image: element.image,
            createdInDb: element.createdInDb,
            diets: element.diets.map(el => el.name)
        }
    })
     return response

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
   
  const recipes = await getAllInfo()
  
  let recipeId = await recipes.filter((element) => element.id == id)
  return recipeId  
};


const postCreateRecipe = async ({name, summary, healthScore, types, image, steps, createdInDb, diets}) => {
    let recipeCreate = await Recipe.create({name, summary, healthScore, types, image, steps, createdInDb});
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
import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_ID = "GET_RECIPES_ID";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const CREATE_RECIPE = "CREATE RECIPE";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const LOADING = "LOADING";
export const RECIPES_FILTER = "RECIPES_FILTER";
export const RESET_PAGE = "RESET_PAGE";

//Promises: 

export const getRecipes= () => async(dispatch) => {
    try {
        const recipes = await axios.get("http://localhost:3001/recipes")
        return dispatch({ type: GET_RECIPES, payload: recipes.data});
    } catch (error) {
        throw new Error(error);
    }
}

export const getDiets = () => async (dispatch) => {
    try {
        const diets = await axios.get("http://localhost:3001/diets")
        return dispatch({type: GET_DIETS, payload: diets.data});
    } catch (error) {
        throw new Error(error);
    }
}

export function createRecipe(payload) {
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/recipes", payload);
        console.log(response)
        return response;
    }
}


export const getRecipeById = (id) => async (dispatch) => {
    try {
        const recipeID = await axios.get(`http://localhost:3001/recipes/${id}`);
        console.log(recipeID)
        return dispatch({type: GET_RECIPES_ID, payload: recipeID.data});
    } catch (error) {
        throw new Error(error);
    }
}

export const getRecipesName = (name) => async (dispatch) => {
    try {
        const recipesName = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        return dispatch({ type: GET_RECIPES_NAME, payload: recipesName.data })
    } catch (error) {
        throw new Error(error);
    }
}

export const filterByOrder = (allRecipes, value) => {
    try {
        let recipesByOrder = value === 'orderAZ' ? 
        allRecipes.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            } 
            if (b.name.toLowerCase() > a.name.toLowerCase()){
                return -1
            }
                return 0;
        }): 
        allRecipes.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
            } 
            if (b.name.toLowerCase() > a.name.toLowerCase()){
                return 1
            }
                return 0;
        })
        return function(dispatch){
            dispatch({type: FILTER_BY_ORDER, payload: recipesByOrder})
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const orderByScore = (allRecipes, value) => {
    try {
        let recipesByScore = value === "ascScore" ? 
        allRecipes.sort((a, b) => {
            if (a.healthScore > b.healthScore) {
                return 1;
            }
            if (a.healthScore < b.healthScore) {
                return -1;
            }
                return 0;
        }):
        allRecipes.sort((a, b) => {
            if (a.healthScore > b.healthScore) {
                return -1;
            }
            if (a.healthScore < b.healthScore) {
                return 1;
            }
                 return 0;
        })
        return function(dispatch){
            dispatch({type: ORDER_BY_SCORE, payload: recipesByScore})
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const filterDiets = (allRecipes, value) => {
    try {
        let recipesFiltered = []
        allRecipes.map((recipe) =>{
            if(recipe.diets.length > 0){
                if(recipe.diets.includes(value)){
                    recipesFiltered.push(recipe)
                }
            }     
        })
       
        return function(dispatch){
            dispatch({type: FILTER_DIETS, payload: recipesFiltered})
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

export const filterRecipes = (payload) => {
    return {
        type: RECIPES_FILTER, 
        payload
    }
   
}

export const cleanDetail = () => {
    try {
        return {
            type : CLEAN_DETAIL,
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const loadingAction = (payload) => {
    
        return (dispatch) => {
            dispatch({type: LOADING, payload})
        }   
    }
    


export const resetPage = (payload) => {

        return (dispatch) => {
            dispatch({type: RESET_PAGE, payload})
        }
        
    
}




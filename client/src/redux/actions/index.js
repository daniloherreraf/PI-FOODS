import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
//export const GET_RECIPES_ID = "GET_RECIPES_ID";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const CREATE_RECIPE = "CREATE RECIPE";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_CREATED= "FILTER_CREATED";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";

//Promises: 

export function getRecipes() {
    return async (dispatch) => {             //dispatch es una accion de redux, aca estoy creando una funcion que retorna acciones,  
        await axios
            .get("http://localhost:3001/recipes")
            .then((response) => {
                dispatch({
                    type: GET_RECIPES,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log(error)
            });
    };
}

export function getDiets() {
    return async (dispatch) => {
        await axios
            .get("http://localhost:3001/diets")
            .then((response) => {
                dispatch({
                    type: GET_DIETS,
                    payload: response.data
                });
            })
            .catch((error) => {
               console.log(error)
            });
    };
}

export function createRecipe(payload) {
    return async function(dispatch) {
        const response = await axios.post(`http://localhost:3001/recipe`, payload)
        console.log(response)
        return response   
    }
}

// export function getRecipeById(id) {
//     return async function (dispatch) {
//         const recipeID = await axios(`http://localhost:3001/recipes/${id}`);
//         return dispatch({
//             type: GET_RECIPES_ID,
//             payload: recipeID.data
//         });
//     };
// }

export function getRecipesName(name) {
    return async (dispatch) => {
        await axios
            .get(`http://localhost:3001/recipes?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_RECIPES_NAME,
                    payload: response.data
                });
            })
            .catch((error) => {
               console.log(error)
            });
    };
}

export function filterByOrder(payload){
    return {
        type: FILTER_BY_ORDER,
        payload
    };
}

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload
    };
}

export function filterDiets(payload) {
    return {
        type: FILTER_DIETS,
        payload
    };
}

export function filterCreated(payload){
    return {
        type:FILTER_CREATED,
        payload
    };
}
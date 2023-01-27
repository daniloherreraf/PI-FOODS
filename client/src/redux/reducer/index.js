
import {
    GET_RECIPES,
    GET_DIETS,
    //GET_RECIPES_ID,
    GET_RECIPES_NAME,
    CREATE_RECIPE,
    FILTER_DIETS,
    FILTER_CREATED,
    FILTER_BY_ORDER, 
    ORDER_BY_SCORE,

} from "../actions/index";

const initialState = {
    recipes: [],
    recipesAll: [],
    diets: [],
   /*  recipeDetail: [],*/
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesAll: action.payload,
            };
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        // case GET_RECIPES_ID:
        //     return {
        //         ...state,
        //         recipeDetail: action.payload,
        //     };
        case GET_RECIPES_NAME:
            return {
                ...state,
                recipes: action.payload,
            };
        case CREATE_RECIPE:
            return {
                ...state,
            };
        case ORDER_BY_SCORE:
                let recipesByScore = action.payload === "ascScore" ? 
                    state.recipesAll.sort((a, b) => {
                        if (a.healthScore > b.healthScore) {
                            return 1;
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                        }
                            return 0;
                    }):
                    state.recipesAll.sort((a, b) => {
                        if (a.healthScore > b.healthScore) {
                            return -1;
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1;
                        }
                            return 0;
                    })
                    return {
                        ...state,
                        recipes: recipesByScore
                    };
      
        case FILTER_BY_ORDER:
                let recipesByOrder = action.payload === 'orderAZ' ? 
                    state.recipesAll.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                        } 
                        if (b.name.toLowerCase() > a.name.toLowerCase()){
                            return -1
                        }
                            return 0;
                    }): 
                    state.recipesAll.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        } 
                        if (b.name.toLowerCase() > a.name.toLowerCase()){
                            return 1
                        }
                            return 0;
                    })
                    return {
                       ...state,
                      recipes: recipesByOrder
                    };

        case FILTER_DIETS:

            const recipesAllAux = state.recipesAll;
            const recipesFiltered = action.payload === "all" ? recipesAllAux : recipesAllAux.filter((recipe) =>recipe.diets.include((element) => element.toLowerCase() === action.payload.toLowerCase()));
            return {
                ...state,
                recipes: recipesFiltered
            };

        case FILTER_CREATED:
            const allRecipesAux = state.recipesAll
            const createdFilter = action.payload === 'created' ? allRecipesAux.filter(element => element.createdInDb) : allRecipesAux.filter(element => !element.createdInDb)
                return {
                    ...state,
                    recipes: action.payload === "all" ? state.allRecipesAux : createdFilter
                }
        
        default:
            return state;


    }
};

export default rootReducer;
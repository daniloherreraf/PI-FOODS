import {
    GET_RECIPES,
    GET_DIETS,
    GET_RECIPES_ID,
    GET_RECIPES_NAME,
    CREATE_RECIPE,
    FILTER_DIETS,
    FILTER_BY_ORDER, 
    ORDER_BY_SCORE,
    CLEAN_DETAIL, 
    LOADING,
    RECIPES_FILTER,
    RESET_PAGE,

} from "../actions/index";

const initialState = {
    recipes: [],
    recipesAll: [],
    diets: [],
    recipeDetail: [],
    loading: true,
    currentPage: 1,
    
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
        case GET_RECIPES_ID:
            return {
                ...state,
                recipeDetail: action.payload,
            };
        case GET_RECIPES_NAME:
            return {
                ...state,
                recipesAll: action.payload,
            };
        case CREATE_RECIPE:
            return {
                ...state,
            };
        case ORDER_BY_SCORE:
            return {
                ...state,
                recipesAll: action.payload
            };
        case FILTER_BY_ORDER:
            return {
                ...state,
                recipesAll: action.payload
            };
        case FILTER_DIETS:
            const all = state.recipes;
            const filterTypes = action.payload === "all" ? all : all.filter((d) => d.diets.includes(action.payload))
            return {
                ...state,
                recipesAll: filterTypes
            };           
        case CLEAN_DETAIL:
            return {
                ...state,
                recipeDetail: [],
                recipesAll: []
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        case RESET_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case RECIPES_FILTER:
            const recipes = state.recipes
            const recipesFiltered = action.payload === "bd" ? recipes.filter(el => el.createdInDb === true) : recipes.filter(el=> el.created === false)

            return {
                ...state,
                recipesAll: action.payload === "all" ? recipes : recipesFiltered,
            }
        default:
            return {
                ...state,
            }
    }
};

export default rootReducer;
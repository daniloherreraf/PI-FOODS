import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "../CardRecipe/CardRecipe"; 
import style from "./Home.module.css";
import Paginated from "../Paginated/Paginated";
import NavBar from "../NavBar/NavBar"
import SearchBar from "../SearchBar/SearchBar";
import {
    getRecipes,
  //  getDiets,
    filterDiets,
    filterCreated,
    filterByOrder,
    orderByScore
} from "../../redux/actions";




export default function Home () {
    const [/* order */, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1); // defino la pagina actual, y un estado que me setee la pagina actual 
    const [recipesPerPage, /* setRecipesPerPage */ ] = useState(9); // defino cuantas recetas por pagina 
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipesAll); //con esta constante me traigo todo lo que esta en el estado de recipes
 // const diets = useSelector((state) => state.diets)
    
   

    useEffect(() => {          // con useEffect realizo el dispatch a mi action getRecipes(), para traerme todas las recetas cuando home se monta
        dispatch(getRecipes());  
     //   dispatch(getDiets());
    }, [dispatch]); // el segundo parametro de la function useEffect un array para evitar un loop infinito de llamados ***importante***, le paso el dispatch para que dependa del dispatch 

 //paginado   
    

    
    const indexOfLastRecipe = currentPage * recipesPerPage;  //pagina actual por la cantidad de recetas por pagina
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //indice de la primera receta
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);  //son las recetas de la pagina actual. //el slice corta un arreglo basado en lo que le pase por parametro 
    

    const paginated = (numPage) => {  //seteo en la página en el numero de la pagina//esto me ayuda en el renderizado
        setCurrentPage(numPage);
    }; 




    function handleFilter(e) {
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    };

    function handleRecipes(e) {     
        dispatch(getRecipes());
        paginated(1);
        // dispatch(loadingAction(true));
        // setTimeout(() => {
        //     dispatch(loadingAction(false));
        // }, 3000);
    };

    function handleCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value}`)    
    };

    function handleFilterByOrder(e){
        dispatch(filterByOrder(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    };

    function handleOrderByScore(e){
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }







     return (
        <div className={style.bg}>
            <div className={style.bg}>
           <div className={style.bg}>
                <div className={style.navBar}>
                    <NavBar paginated={paginated} />
                </div>
                <div className={style.filtroPaginado}>
                    <div className={style.sortFilter}>                        
                        <h1>Healthy Recipes to take care of your Diet</h1>
                        <div>
                            <button onClick={(e) => handleRecipes(e)}>Refresh</button>
                        </div> 
                            <select onChange={(e) => handleFilterByOrder(e)}>  
                                <option value="orderAZ">Recipes A-Z</option>
                                <option value="orderZA">Recipes Z-A</option>
                            </select>
                            <select onChange={(e) => handleOrderByScore(e)}>
                                <option value="ascScore">Up</option>
                                <option value="descScore">Falling</option>
                            </select>
                            <select onChange={e => handleFilter(e)}>
                                <option value="all">All Diets</option>
                                <option value="dairy free">Dairy Free</option>
                                <option value="fodmap friendly">Fodmap Friendly</option>
                                <option value="gluten free">Gluten Free</option>
                                <option value="ketogenic">Ketogenic</option>
                                <option value="lacto ovo vegetarian">Lacto Vegetarian</option>
                                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                                <option value="low FODMAP">Low FODMAP</option>
                                <option value="ovo-vegetarian">Ovo Vegetarian</option>
                                <option value="paleolithic">Paleolithic</option>
                                <option value="pescatarian">Pescatarian</option>
                                <option value="primal">Primal</option>
                                <option value="vegan">Vegan</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="whole 30">Whole 30</option>
                            </select>
                            <select onChange={e => handleCreated(e) }>
                                <option value="all">All</option>
                                <option value="created">Created</option>
                                <option value="api">Existent</option>
                            </select>
                            
                            <div className={style.paginado}>
                        </div>
                            <Paginated
                            recipesPerPage={recipesPerPage}
                            allRecipes={allRecipes.length}
                            paginated={paginated}
                            />
                            <SearchBar/>
                            </div>
                        </div>                 
                        <div className={style.card}>
                            <div className={style.card1}>
                                {
                                    currentRecipes?.map((recipe) => {
                                        return (
                                            <div key={recipe.id}>
                                                <CardRecipe
                                                    id={recipe.id}
                                                    name={recipe.name}
                                                    img={recipe.image}
                                                    diets={recipe.diets}
                                                    types={recipe.types}
                                                    healthScore={recipe.healthScore}
                                            /> 
                            </div>
                            )})}
                </div>
            </div>
        </div>
        </div>
    </div>    
    )
}







import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "../CardRecipe/CardRecipe"; 
import style from "./Home.module.css";
import Paginated from "../Paginated/Paginated";
import NavBar from "../NavBar/NavBar"
import Search from "../Search/Search";
import {
    getRecipes,
    getDiets,
    filterDiets,
    filterByOrder,
    orderByScore,
    filterRecipes,
    resetPage,
    cleanDetail,
} from "../../redux/actions";




const Home = () => {
    const [/* order */, setOrder] = useState("")
   /*  const [currentPage, setCurrentPage] = useState(1);  */
    const [recipesPerPage, /* setRecipesPerPage */ ] = useState(9); 
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipesAll); 
    const currentPage = useSelector((state) => state.currentPage)
    const diets = useSelector((state) => state.diets)
    
    
   

    useEffect(() => {         
        dispatch(getRecipes());  
        dispatch(getDiets());
        dispatch(cleanDetail())
       
    }, [dispatch]); 
    

    
    const indexOfLastRecipe = currentPage * recipesPerPage;  //pagina actual por la cantidad de recetas por pagina
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //indice de la primera receta
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);  //son las recetas de la pagina actual. //el slice corta un arreglo basado en lo que le pase por parametro 
    

    const paginated = (currentPage) => {  //seteo en la página en el numero de la pagina//esto me ayuda en el renderizado
        dispatch(resetPage(currentPage))
    }; 


    function handleFilter(e) {
        dispatch(filterDiets(allRecipes, e.target.value));
        dispatch(resetPage(1));
        setOrder(`${e.target.value}`)
    };

    function handleRecipes(e) {     
        dispatch(getRecipes());
        paginated(1);
        
    };

    function handleFilterByOrder(e){
        dispatch(filterByOrder(allRecipes, e.target.value))
        dispatch(resetPage(1));
        setOrder(`Order ${e.target.value}`)
    };

    function handleOrderByScore(e){
        dispatch(orderByScore(allRecipes, e.target.value))
        dispatch(resetPage(1));
        setOrder(`Order ${e.target.value}`)
    }

    function handleFilterRecipe(e){
        
        dispatch(filterRecipes(e.target.value))
        dispatch(resetPage(1));
        setOrder(`Order ${e.target.value}`)

    }


     return (
        <div className={style.bg}>
            <div className={style.bg}>
                <div className={style.bg}>
                    <div className={style.navBar}>
                        <NavBar />
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
                                <option value="ascScore">AsScore</option>
                                <option value="descScore">DescScore</option>
                            </select>
                            <select onChange={e => handleFilter(e)}>
                                <option value="all">All Diets</option>
                                {diets.length ? diets.map((e) =>
                                <option value={e.name} key={e.id}>{e.name}</option>) : null}
                            </select>  
                            <select onChange={e => handleFilterRecipe(e)}>
                                <option value="all">All Recipes</option>
                                <option value="api">Recipes API</option>
                                <option value="bd">Recipes BD</option>
                            </select>                         
                            <div className={style.paginado}>
                        </div>
                        <Paginated
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginated={paginated}
                        />
                        <Search
                        />
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

export default Home;







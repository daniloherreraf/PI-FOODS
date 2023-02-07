import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, cleanDetail } from "../../redux/actions";
import { useEffect } from "react";
import style from "./DetailRecipe.module.css"

const DetailRecipe = () => {
    const dispatch = useDispatch()
    const recipe = useSelector((state) => state.recipeDetail)
    const { id } = useParams() // nos permite acceder desde un componente a los parametros de una ruta

   
    useEffect(() => {
        dispatch(getRecipeById(id));
        return () =>{
            dispatch(cleanDetail())
        }
      
    }, [id, dispatch])

    
    return (
        <div className={style.bgImg}>
            <div className={style.nav}>
                <Link to="/home">
                    <button>Back</button>
                </Link>
            </div>
           {
            recipe.length>0 ?
            <div>
                <h1 className={style.bgDetail}>{recipe[0].name}</h1>
                <div>
                    <img className={style.imagen} src = {recipe[0].image}/>
                </div>
                <h2>{`${recipe[0].healthScore}%`}</h2>
                <h4>Diets : {!recipe[0].createdInDb ? recipe[0].diets + " " : recipe[0].diets.map(element => element.name + (" "))}</h4>
                <h4>Dish Types: {!recipe[0].createdInDb ? recipe[0].types + " " : recipe[0].types}</h4>
                <div className={style.contenido3}>
                    <h3>Summary :</h3>
                    <p>{recipe[0].summary.replace(/<[^>]*>/g, "")}</p>
                </div>
                <br/>
                <div className={style.contenido3}>
                    <h3>Steps : </h3>
                    <p>{recipe[0].steps.replace(/<[^>]*>/g, "")}</p>
                </div>
            </div> : <p>Loading..</p>
           }
        </div>
        )
};


export default DetailRecipe;
import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const CardRecipe = ({ name, img, diets, id, types, healthScore }) => {
    return (
        <div className={style.card} >
            <div className={style.infoCard}>
                <img title={name} src={img} alt="Img not Found" />
            </div>
            <div className={style.btnI}>
                <div>
                    <h3>{name}</h3>
                </div>
                <Link to={`/detailrecipe/${id}` }>
                    <h5>Open Details</h5>
                </Link>
            </div>
            <br />
            <div className={style.infoCard3}>
                <div className={style.infoCard2}>
                    {diets ? (
                        <div>
                            {diets.map((element) =>{
                                if(typeof diets[0] === "object") {
                                    return <h5 key={element.name}>{element.name}</h5>
                                }
                                return <h5 key={element}>{element}</h5>
                            })}
                        </div>
                    ) : (
                        <h4>Not diets</h4>
                    )}
                            
                    <div>
                        {
                            types ? types.map((element) => <h5 key={element}>{element}</h5>) : <h5>Not Types</h5>
                        }
                    </div>
                </div>
                
            </div>
            <div className={style.h4}>
                <h5> {`HealthScore: ${healthScore}%`}</h5>  
            </div>        
        </div>   
    )
}

export default CardRecipe;


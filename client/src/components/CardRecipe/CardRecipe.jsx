import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function CardRecipe({ name, img, diets, id, types, healthScore }) {
    return (
        <div className={style.card} >
            <div className={style.infoCard}>
                <img title={name} src={img} alt="Img not Found" />
            </div>
            <div className={style.btnI}>
                <div>
                    <h3>{name}</h3>
                </div>
                <Link to={`/recipes/${id}`}>
                    <button tittle= "Open Details">X</button>
                </Link>
            </div>
            <br />
            <div className={style.infoCard3}>
                <div className={style.infoCard2}>
                    <div>
                        {
                            diets ? diets.map((element) => <h5 key={element}>{element}</h5>) : <h5>Not Diets</h5>
                        }
                    </div>
                              
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


import React from "react";
import style from "./Paginated.module.css";

export default function Paginated({ recipesPerPage, allRecipes, paginated/* , page */ }) {
    const pages = [];

     for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pages.push(i);
     }

     return (
        <div className={style.bg}>
            <div className={style.btn} >
                {
                  pages && pages?.map((number) =>{
                    return (
                    <div key={number}>
                        <button type="button" onClick={() => paginated(number)}>{number}</button>
                    </div>
                    )
                    })}
            </div>
        </div>        
     )
}

import React from "react";
import style from "./Paginated.module.css";

const Paginated = ({ recipesPerPage, allRecipes, paginated }) => {
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

export default Paginated

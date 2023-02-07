import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = () => {
   return (
     <div className={style.bg}>
        <div className={style.bgHyC}>
            <Link to="/">
                <button>Landing</button>
            </Link>
            <Link to="/createRecipe">
                <button>Create Recipe</button>
            </Link>
       </div>
    </div>
   );
}

export default NavBar;

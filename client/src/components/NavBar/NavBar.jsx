import React from "react";
import { Link } from "react-router-dom";
/* import SearchBar from "./SearchBar"; */
import style from "./NavBar.module.css";


export default function NavBar() {
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
       {/* <div className={style.bgSearch}>
        <SearchBar/>
       </div> */}
    </div>
   );
}

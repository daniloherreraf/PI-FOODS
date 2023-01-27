import React from "react";
import { Link } from "react-router-dom" 
import style from "./Landing.module.css";


export default function LandingPage() {
    return (
        <div className={style.bgImg}>
            <h1 className={style.mensaje}>Welcome</h1>
            <Link to="/Home">
                <button className={style.button}>RECIPES</button>
            </Link>

        </div>
        
    );
}

import React from "react";
import { useState, } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName,  resetPage, cleanDetail } from "../../redux/actions";
import style from "./Search.module.css"


const Search = () => {
    
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    
    const searchHandler = (event) => {
        setName(event.target.value);
    }

  

    const submitHandler = () => {
        if (name) {
            dispatch(getRecipesName(name));
            dispatch(cleanDetail())
            dispatch(resetPage(1));
            setName("")
            
            } else {
                alert("!!Type a name to search!!")
            }
        }
    
    return (
        
        <div className={style.bgSearch}>
            <input className={style.bgIyBtn} id="search" type="search" placeholder="Ingrese el nombre a buscar..." onChange={searchHandler} value={name} />
            <button className={style.bgIyBtnI} type="submit" onClick={submitHandler} value={name}>Buscar</button>
                   
</div>
    )
}

export default Search;


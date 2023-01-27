import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../redux/actions";


export default function SearchBar() {
    const [ name, setName ] = useState("");
    const dispatch = useDispatch;
    

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getRecipesName(name))
        setName("")
    }

    return (
        <div>
            <input type = "text" placeholder="Search..." onChange={handleInputChange} value={name}/>
            <button type="submit" onClick={handleSubmit}>Search</button>
            
        </div>
    )
}
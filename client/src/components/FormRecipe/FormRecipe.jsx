import React from "react"; 
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../../redux/actions";
import style from "./FormRecipe.module.css";



const validate = (input) => {
  
  let error = {};

  if (!input.name) {error.name = "The name is required.";}

  if (!/^[a-zA-Z ]+$/.test(input.name)) {error.name = "The title requires letters";}

  if (input.name.length <= 2 || input.name.length >= 60) {error.name = "The title requires from 2 to 50 letters.";}

  if (!input.summary) {error.summary = "The summary is required.";} 

  else if (input.summary.length <= 2 || input.summary.length >= 500) {error.summary = "The title requires from 2 to 200 letters.";}

  if (input.healthScore < 1 || input.healthScore > 100) {error.healthScore = "The score must be a number between 1 and 100.";}

  /* if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)) {error.image = "Url incorrect.";} */

  return error;
}



const FormRecipe = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const diet = useSelector((state) => state.diets);
  console.log(diet)
 
  
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diets: [],
    types: [],
  });

  const [error, setError] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: "",
    types: "",
  });


  const handleChange = (e) => {
    const value = e.target.value
    const property = e.target.name
    setError(
      validate({...input,
        [property] : value
      })
    );

    setInput({...input,
    [property] : value
    })
    console.log(input)
  };

  const handleSelect = (e) => {
    setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
  };

  const handleDelete = (element) => {
    
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== element),
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if(input.name && input.summary && input.diets) {
    
      dispatch(createRecipe(input))
        alert("Recipe Created");

      setInput({
        name: "",
        image: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
        types: [],
      });
      history.push("/home");
    } else {
      alert("!!Recipe Not created!! . !!Required data : NAME, SUMMARY, DIETS!! ")
    }
  };

 

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  

  

 
  return (
    <div className={style.bgImg}>
      <div className={style.nav}>
      <Link to="/home">
        <button>Back</button>
      </Link>
      </div>
      <div>
        <h1 className={style.bgDetail}>New Recipe</h1>
        <div className={style.contenido}>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <label>Name: </label>
              <input
              type="text"
              value={input.name}
              name="name"
              placeholder="Write your recipe....."
              onChange={(e)=>handleChange(e)}
              />
              {error.name && <span>{error.name}</span>}
              <br/>
            </div>
            <div>
              <label>Image url: </label>
              <input
              type="text"
              value={input.image}
              name="image"
              placeholder="Url image of your recipe..."
              onChange={(e)=>handleChange(e)}
              />
              {error.image && <span>{error.image}</span>}
              <br />
              <div>
                <label>Health Score: {`${input.healthScore}%`}</label>
                <input
                type="range"
                value={input.healthScore}
                name="healthScore"
                onChange={(e)=>handleChange(e)}
                min={0}
                max={100}
                />
                {error.healthScore && <span>{error.healthScore}</span>}
                <br/>
              </div>
              
                <label>Summary: </label>
                <textarea
                type="text"
                value={input.summary}
                name="summary"
                onChange={(e)=>handleChange(e)}
                />
                {error.summary && <span>{error.summary}</span>}
                <br />
              </div>
              <div>
                <label>Steps: </label>
                <textarea
                type="text"
                value={input.steps}
                name="steps"
                onChange={(e)=>handleChange(e)}
                />
                <br/>
              </div>
              <div>
                <label>Diets: </label>
                <select onChange={(e)=>handleSelect(e)} defaultValue="default">
                {<option default></option>}
                  {diet?.map((diet) =>{
                    return(
                      <option value={diet.name}>{diet.name}</option>
                          )
                })}
                </select>
                <ul><li>{input.diets.map(element => element + " ,")}</li></ul>
                {input.diets.map(element =>
                <div>
                  <p>{element}</p>
                  <button onClick={()=>handleDelete(element)}>x</button>
                </div>
              )}
              <div>
              
              <div className={style.btnSubmit}>
                <button type= "submit">Create Recipe</button>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default FormRecipe;


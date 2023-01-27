import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
//import DetailRecipe from './components/DetailRecipe/DetailRecipe';
import FormRecipe from './components/FormRecipe/FormRecipe';


function App() {
  return (
    <BrowserRouter>
    <div className='App'>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          {/* <Route exact path="/recipes/:id" component={DetailRecipe} /> */}
          <Route path="/createRecipe" component={FormRecipe} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;

import {getRecipes, setLocalStorage} from "./dataConnection.js";
import {appliancesFilter, appliancesFilterLoadInit, displayRecipe, IngredientsFilter, ingredientsLoadInit, ListenersLoad, ustensilsFilter, ustensilsFilterLoadInit } from "./utils.js";



async function initPage(){

  const recipes = await getRecipes();  
  setLocalStorage(recipes);

    ListenersLoad();
    IngredientsFilter();
    appliancesFilter();
    ustensilsFilter();
    ingredientsLoadInit();
    appliancesFilterLoadInit();
    ustensilsFilterLoadInit();
    displayRecipe();
  
   

}




initPage();
/*
const text = [1,2,3];
setLocalStorage(text);
const toto = getLocalStorage()
console.log(toto); */
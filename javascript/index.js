import {getLocalStorage, getRecipes, setLocalStorage} from "./dataConnection.js";
import {appliancesFilter, appliancesFilterLoad, displayRecipe, IngredientsFilter, ingredientsLoad, ListenersLoad, ustensilsFilter, ustensilsFilterLoad } from "./utils.js";



async function initPage(){
  let init = true;
  const recipes = await getRecipes();
  /* enregistrer tout les recettes display true dans le local stockage
  du navigateur à l'initialisation de la page  */
  setLocalStorage(recipes);
 

  ListenersLoad();
  IngredientsFilter();
  appliancesFilter();
  ustensilsFilter();
  ingredientsLoad();
  appliancesFilterLoad();
  ustensilsFilterLoad();
  displayRecipe();
}




initPage();
/*
const text = [1,2,3];
setLocalStorage(text);
const toto = getLocalStorage()
console.log(toto); */
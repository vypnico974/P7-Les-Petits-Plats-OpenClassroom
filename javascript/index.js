import {getRecipes, setLocalStorage} from "./dataConnection.js";
import {applianceListMenu, appliancesMenuDisplay, displayRecipe, IngredientsListMenu, ingredientsMenuDisplay, ListenersLoad, ustensilsListMenu, ustensilsMenuDisplay } from "./utils.js";



async function initPage(){
  const recipes = await getRecipes();
  /* enregistrer tout les recettes display true dans le local stockage
  du navigateur à l'initialisation de la page  */
  setLocalStorage(recipes);
 

  ListenersLoad();
 // IngredientsListMenu();
 // applianceListMenu();
 // ustensilsListMenu();
  ingredientsMenuDisplay();
  appliancesMenuDisplay();
  ustensilsMenuDisplay();
  displayRecipe();
}




initPage();
/*
const text = [1,2,3];
setLocalStorage(text);
const toto = getLocalStorage()
console.log(toto); */
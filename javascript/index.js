import {getRecipes, setLocalStorage} from "./dataConnection.js";
import {appliancesMenuDisplay, displayRecipe, ingredientsMenuDisplay, ListenersLoad,ustensilsMenuDisplay } from "./utils.js";

async function initPage(){
  /*lecture de recipes.json pour extraction des données avec rajout d'un champs
  display qui est à défaut à la valeur True */
  const recipes = await getRecipes();
  /* enregistrer tout les recettes display true dans le local stockage
  du navigateur à l'initialisation de la page  */
  setLocalStorage(recipes);
 /* création des écouteurs d'évènements  */
  ListenersLoad();
  /* affichage des menus filtres ingrédients/appareils/ustensiles  */
  ingredientsMenuDisplay(recipes);
  appliancesMenuDisplay(recipes);
  ustensilsMenuDisplay(recipes);
  /* affichage toutes les recettes  */
  displayRecipe(recipes);
}

initPage();

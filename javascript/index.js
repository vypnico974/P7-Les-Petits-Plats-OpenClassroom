import {getRecipes, setLocalStorage} from "./dataConnection.js";
import {appliancesMenuDisplay, displayRecipe, ingredientsMenuDisplay, ListenersLoad,ustensilsMenuDisplay } from "./utils.js";



async function initPage(){
  const recipes = await getRecipes();
  /* enregistrer tout les recettes display true dans le local stockage
  du navigateur à l'initialisation de la page  */
  setLocalStorage(recipes);
 /* création des écouteurs d'évènements  */
  ListenersLoad();
  /* affichage des menus filtres ingrédients/appareils/ustensiles  */
  ingredientsMenuDisplay();
  appliancesMenuDisplay();
  ustensilsMenuDisplay();
  /* affichage toute les recettes  */
  displayRecipe();
}




initPage();

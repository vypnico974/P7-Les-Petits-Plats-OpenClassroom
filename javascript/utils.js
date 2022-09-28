import { getLocalStorage } from "./dataConnection.js";


/* affichage des recettes trié par nom   */
export function displayRecipe(){
    const recipes = getLocalStorage();
    const recipesSortName = sortByName(recipes);
    const dom = document.querySelector("#div-recipes");
    let content = ""; /* pour structure card  */
    dom.innerHTML = ""; /* pour afficher card   */
    
    recipesSortName.forEach(recipe => {
        if (recipe.display){
            content +=
            `<div class="card-recipe">
                <div>
                <div class="recipePicture"></div>
                <div class="divRecipeInfo">
                        <div class="headRecipeInfo">
                            <h2 class="divRecipeName">${recipe.name}</h2>
                            <span class="timerRecipe"><i class="far fa-clock"></i>${recipe.time}min</span>
                        </div>

                        <div class="mainRecipeInfo">
                            <div class="divIngredientsLeft">`

        /* Parcourir chaque ingrédient de la recette */
        for (let index = 0; index < recipe.ingredients.length; index++) {
            recipe.currentIngredient = recipe.ingredients[index];
            content += `<span class="bold800">${recipe.currentIngredient.ingredient}</span>`;
            if (recipe.currentIngredient.quantity) {
                content += `: ${recipe.currentIngredient.quantity}`;
            }
            if (recipe.currentIngredient.unit) {
                switch (recipe.currentIngredient.unit) {
                    case "grammes":
                        content += "g";
                        break;
                    case "ml": case "cl": case "kg":
                        content += recipe.currentIngredient.unit;
                        break;

                    default:
                        content += " " + recipe.currentIngredient.unit;
                        break;
                }
            }
            content += `<br/>`;
        }
      //  console.log(content);
                            content +=            `</div>
                            <div class="divIngredientsRight">                               
                                <p class="card-text">${recipe.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

       // console.log(content);
        dom.innerHTML = content;

          
        }
    });

}

// ${recipe.ingredients.map(ingredient => `<span class="bold600"> ${ingredient.ingredient} ${ingredient.quantity ? " :</span> <span>" + ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></span><br>`).join("")}


/**
 * Tri d'un tableau  ordre alphabétique croissant
 * @param {*} tab Tableau passé en entrée, à trier
 * @return tableau trié par ordre alphabétique
 */
 export function sortByName(tab) {
    const sortedTab = tab.sort(function(a, b) {
        a = a.name;
        b = b.name;
        if (a > b) {
            return 1;
        } else if(a < b){
            return -1;
        }else{
            return 0;
        }
    });
    return sortedTab
}
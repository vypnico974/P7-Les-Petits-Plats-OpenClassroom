import {getLocalStorage, getRecipes, setLocalStorage} from "./dataConnection.js";


export function IngredientsFilter(){
    /*  get the list of all ingredients */
    let recipesData = getLocalStorage();
    let ingredientsList = [];
    for (let index = 0; index < recipesData.length; index++) {
        let ingredients = recipesData[index].ingredients;
        ingredients.map(({ ingredient }) => {
        ingredientsList.push(`${ingredient.toLowerCase()}`);
        });
    }
//    console.log("liste ingrédients :",ingredientsList);
    /* no repeat */
    let ingredientsListUniqueSet = new Set(ingredientsList);
    /* convert Set to Array */
    let ingredientsListUnique = [...ingredientsListUniqueSet]    
//    console.log("liste ingrédients unique :",ingredientsListUnique);
    /*  alphabetical order */
    let ingredientsListUniqueSort = ingredientsListUnique.sort();
//    console.log("liste ingrédients trié :",ingredientsListUniqueSort);  

    return ingredientsListUniqueSort    
}

export function appliancesFilter(){
    /*  get the list of all appliances */
   let recipesData = getLocalStorage();
   let appliancesList = [];
   for (let index = 0; index < recipesData.length; index++) {
       let appliances = recipesData[index].appliance;
       appliancesList.push(`${appliances.toLowerCase()}`);
   }
//    console.log("liste appareils :",appliancesList);
   /* no repeat */
   let appliancesListUniqueSet = new Set(appliancesList);
   /* convert Set to Array */
   let appliancesListUnique = [...appliancesListUniqueSet]    
//     console.log("liste appareils unique :",appliancesListUnique);
   /*  alphabetical order */
   let appliancesListUniqueSort = appliancesListUnique.sort();
//    console.log("liste appareils trié :",appliancesListUniqueSort);  

   return appliancesListUniqueSort    
}

export function ustensilsFilter(){
    /*  get the list of all appliances */
   let recipesData = getLocalStorage();
   let ustensilsList = [];
   for (let index = 0; index < recipesData.length; index++) {
       let ustensils = recipesData[index].ustensils;
       ustensilsList.push(ustensils);
   }
//    console.log("liste ustensils :", ustensilsList);
  /* no repeat   */
   /* Embeds the values ​​from the subarray into the array and LowerCase elements */
   let ustensilsListJoined = ustensilsList.flat().map((x) => x.toLowerCase());      
//     console.log("liste ustensils unique :",ustensilsListJoined);
   /*  alphabetical order */
   let ustensilsListSort = ustensilsListJoined.sort();
 //  console.log("liste ustensils trié :",ustensilsListUniqueSort); 
   

   let ustensilsListUniqueSort = new Set(ustensilsListSort) 
    /* convert Set to Array */
    let ingredientsListUnique = [...ustensilsListUniqueSort] 
 //   console.log("liste ustensils trié test :",ingredientsListUnique); 

   return ustensilsListUniqueSort    
}





/**
 * affichage des recettes trié par nom
 */
export function displayRecipe(){
    const recipes = getLocalStorage();
    const recipesSortName = sortByName(recipes);
    const dom = document.querySelector("#div-recipes");
    let content = ""; /* pour structure card  */
    dom.innerHTML = ""; /* pour afficher card   */
   
    if (!recipesSortName){
        dom.innerHTML =  `« Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.`;
    }
    else {
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
}



/**
 * Gestion de l'affichage des menus et en cours pour la partie listes des menus
 * @param {*} block nom du menu à  afficher/cacher
 * @param {*} action afficher/masquer des menus filtres
 */
 export function FiltersListDisplay(block, action) {
    let childrenList = null;
    switch (block) {
        case "ingredients":
            childrenList = document.getElementById("filterIngredients").children;
            if (action == "visible") {
                document.getElementById("filterIngredients").classList.add("show");
                document.getElementById("filterAppliances").classList.remove("show");
                document.getElementById("filterUstensiles").classList.remove("show");
                document.getElementById("hideIngredientsList").classList.remove("hidden"); 
                document.getElementById("hideAppliancesList").classList.add("hidden"); 
                document.getElementById("hideUstensilesList").classList.add("hidden");              
            }else if(action == "hide"){
                document.getElementById("filterIngredients").classList.remove("show");
                document.getElementById("hideIngredientsList").classList.add("hidden");
            }
            break;
        case "appareils":
            childrenList = document.getElementById("filterAppliances").children;
            if (action == "visible") {
                document.getElementById("filterAppliances").classList.add("show");
                document.getElementById("filterIngredients").classList.remove("show");
                document.getElementById("filterUstensiles").classList.remove("show");
                document.getElementById("hideAppliancesList").classList.remove("hidden");
                document.getElementById("hideIngredientsList").classList.add("hidden"); 
                document.getElementById("hideUstensilesList").classList.add("hidden");                
            }else if(action == "hide"){
                document.getElementById("filterAppliances").classList.remove("show");
                document.getElementById("hideAppliancesList").classList.add("hidden");
            }
            break;
        case "ustensiles":
            childrenList = document.getElementById("filterUstensiles").children;          
            if (action == "visible") {
                document.getElementById("filterUstensiles").classList.add("show");
                document.getElementById("filterIngredients").classList.remove("show");
                document.getElementById("filterAppliances").classList.remove("show");
                document.getElementById("hideUstensilesList").classList.remove("hidden"); 
                document.getElementById("hideIngredientsList").classList.add("hidden");
                document.getElementById("hideAppliancesList").classList.add("hidden");                                              
            }else if(action == "hide"){
                document.getElementById("filterUstensiles").classList.remove("show");
                document.getElementById("hideUstensilesList").classList.add("hidden");
            }
            break;
    }
}

/**
 * Création de listeners au chargement de la page
 */
 export function ListenersLoad(){
    /* listener sur le champ de recherche */
     document.querySelector("#search-input").addEventListener("keyup", filtersApply);
  
    /* listeners sur les boutons des filtres pour afficher/réduire les listes */
    document.querySelector("#visibleIngredientsList").addEventListener("click", () =>{
        FiltersListDisplay("ingredients", "visible")
    });
    document.querySelector("#hideIngredientsList").addEventListener("click", () =>{
        FiltersListDisplay("ingredients", "hide")
    });
    document.querySelector("#visibleAppliancesList").addEventListener("click", () =>{
        FiltersListDisplay("appareils", "visible")
    });
    document.querySelector("#hideAppliancesList").addEventListener("click", () =>{
        FiltersListDisplay("appareils", "hide")
    });
    document.querySelector("#visibleUstensilesList").addEventListener("click", () =>{
        FiltersListDisplay("ustensiles", "visible")
    });
    document.querySelector("#hideUstensilesList").addEventListener("click", () =>{
        FiltersListDisplay("ustensiles", "hide")
    });

    /* listener sur les champs de recherche des filtres avancés */
    document.querySelector("#inputIngredient").addEventListener("keyup", (e) => {
        itemSearch("ingredient", e.target.value);
    });
    document.querySelector("#inputAppliance").addEventListener("keyup", (e) => {
        itemSearch("appareil", e.target.value);
    });
    document.querySelector("#inputUstensile").addEventListener("keyup", (e) => {
       itemSearch("ustensile", e.target.value);
    });
}



/* à faire   */
export function filtersApply(){
    console.log("à faire recherche inputs des menus");


}

/**** à faire */
export function itemSearch(nameFilter,inputItem){
    console.log("éléments sélectionnés :", inputItem );
}


/** chargement liste ingrédients au chargement de la page */
export function ingredientsLoadInit(){
    let content = [];
    const ingredients = IngredientsFilter();
    const ingredientsList =  document.querySelector("#ingredientsList")

     ingredients.forEach(ingredient => {
        content += `<div class="filterItem">${ingredient}</div>`;
    });

    ingredientsList.innerHTML = content;

    /* listener la liste filtrée des ingrédients pour la création des tags ingrédients */
    createdItems = ingredientsList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
                EvenDisplay("add", "ingredient", item.innerText);            
        })
    }
}   


export function EvenDisplay(){

}

/** chargement liste appareils au chargement de la page 
 * et écoute évènement de la liste créée.*/
export function appliancesFilterLoadInit(){
    let content = [];
    const appliances = appliancesFilter();
    const appliancesList =  document.querySelector("#appliancesList")

    appliances.forEach(appliance => {
        content += `<div class="filterItem">${appliance}</div>`;
    });

    appliancesList.innerHTML = content;

     /* listener la liste filtrée des ingrédients pour la création des tags ingrédients */
    createdItems = appliancesList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
                EvenDisplay("add", "ingredient", item.innerText);            
        })
    }

    
}


/** chargement liste ustensiles au chargement de la page */
export function ustensilsFilterLoadInit(){
    let content = [];
    const ustensilesList = ustensilsFilter();
    const ustensiles =  document.querySelector("#ustensilesList")

    ustensilesList.forEach(ustensile => {
        content += `<div class="filterItem">${ustensile}</div>`;
    });

    ustensiles.innerHTML = content;
}
   


/**
 * Tri d'un tableau  ordre alphabétique croissant
 * @param tab Tableau passé en entrée, à trier
 * @return tableau trié par ordre alphabétique */ 
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
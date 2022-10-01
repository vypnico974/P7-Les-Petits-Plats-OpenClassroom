import {getLocalStorage} from "./dataConnection.js";

/*  Tableau recette  */
let currentLocalRecipes =  [];
/* Tableaux des tags */
let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];


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
export function displayRecipe(recipes){
    const recipesSortName = sortByName(recipes);
    const dom = document.querySelector("#div-recipes");
    const message = document.querySelector("#div-message");
    let content = ""; /* pour structure card  */
    dom.innerHTML = ""; /* pour afficher card   */
    message.innerHTML ="" /*  pour message d'erreur   */
   
   
    recipesSortName.forEach(recipe => {
        /*  affichage des recettes uniquement si display = true */
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
    
           
        }      
    }); 
    if (!content){
        message.innerHTML =  `« Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.`;
    }
    else {
    // console.log(content);
    dom.innerHTML = content;
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
                document.getElementById("filterUstensils").classList.remove("show");
                document.getElementById("hideIngredientsList").classList.remove("hidden"); 
                document.getElementById("hideAppliancesList").classList.add("hidden"); 
                document.getElementById("hideUstensilsList").classList.add("hidden");              
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
                document.getElementById("filterUstensils").classList.remove("show");
                document.getElementById("hideAppliancesList").classList.remove("hidden");
                document.getElementById("hideIngredientsList").classList.add("hidden"); 
                document.getElementById("hideUstensilsList").classList.add("hidden");                
            }else if(action == "hide"){
                document.getElementById("filterAppliances").classList.remove("show");
                document.getElementById("hideAppliancesList").classList.add("hidden");
            }
            break;
        case "ustensils":
            childrenList = document.getElementById("filterUstensils").children;          
            if (action == "visible") {
                document.getElementById("filterUstensils").classList.add("show");
                document.getElementById("filterIngredients").classList.remove("show");
                document.getElementById("filterAppliances").classList.remove("show");
                document.getElementById("hideUstensilsList").classList.remove("hidden"); 
                document.getElementById("hideIngredientsList").classList.add("hidden");
                document.getElementById("hideAppliancesList").classList.add("hidden");                                              
            }else if(action == "hide"){
                document.getElementById("filterUstensils").classList.remove("show");
                document.getElementById("hideUstensilsList").classList.add("hidden");
            }
            break;
    }
}

/**
 * Création de listeners au chargement de la page
 */
 export function ListenersLoad(){
    /* listener sur le champ de recherche */
     document.querySelector("#search-input").addEventListener("keyup", actionFilters);
  
    /* listener sur les boutons des filtres pour afficher/réduire les listes */
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
    document.querySelector("#visibleUstensilsList").addEventListener("click", () =>{
        FiltersListDisplay("ustensils", "visible")
    });
    document.querySelector("#hideUstensilsList").addEventListener("click", () =>{
        FiltersListDisplay("ustensils", "hide")
    });

    /* listener sur les champs de recherche des filtres avancés */
    document.querySelector("#inputIngredient").addEventListener("keyup", (e) => {
        itemSearch("ingredient", e.target.value);
    });
    document.querySelector("#inputAppliance").addEventListener("keyup", (e) => {
        itemSearch("appareil", e.target.value);
    });
    document.querySelector("#inputUstensil").addEventListener("keyup", (e) => {
       itemSearch("ustensil", e.target.value);
    });
}


/**** à faire */
export function itemSearch(nameFilter,inputItem){
    console.log("éléments sélectionnés :", inputItem );
}


/** chargement liste ingrédients au chargement de la page */
export function ingredientsLoadInit(){
    let content = [];
    let createdItems = null;
    const ingredients = IngredientsFilter();
    const ingredientsList =  document.querySelector("#ingredientsList")

     ingredients.forEach(ingredient => {
        content += `<div class="filterItem">${ingredient}</div>`;
    });

    ingredientsList.innerHTML = content;

    /* listener de la liste des ingrédients pour la création des tags ingrédients */
    createdItems = ingredientsList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
                evenTag("add", "ingredient", item.innerText);            
        })
    }
}   


/** chargement liste appareils au chargement de la page 
 * et écoute évènement de la liste créée.*/
export function appliancesFilterLoadInit(){
    let content = [];
    let createdItems = null;
    const appliances = appliancesFilter();
    const appliancesList =  document.querySelector("#appliancesList")

    appliances.forEach(appliance => {
        content += `<div class="filterItem">${appliance}</div>`;
    });

    appliancesList.innerHTML = content;

     /* listener de la liste des appareils pour la création des tags appareils */
    createdItems = appliancesList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
                evenTag("add", "appliance", item.innerText);            
        })
    }    
}


/** chargement liste ustensils au chargement de la page */
export function ustensilsFilterLoadInit(){
    let content = [];
    let createdItems = null;
    const ustensils = ustensilsFilter();
    const ustensilsList =  document.querySelector("#ustensilsList")

    ustensils.forEach(ustensil => {
        content += `<div class="filterItem">${ustensil}</div>`;
    });

    ustensilsList.innerHTML = content;

    /* listener de la liste  des ustensiles pour la création des tags appareils */
    createdItems = ustensilsList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
                evenTag("add", "ustensil", item.innerText);            
        })
    } 
}
   

/**
 * Evènements des tags
 * @param {*} action  "add" ou "delete" pour création ou suppression Tags 
 * @param {*} tagType pour création tag ingredient/appareil/ustensile
 * @param {*} content Texte du Tag
 */
export function evenTag(action,nameList,item){
    console.log(action + " " + nameList + " " + item );
    switch (action) {
        case "add":
            switch (nameList) {
                case "ingredient":
                    ingredientTags.push(item);
                    document.getElementById("inputIngredient").value = "";
                    break;
                case "appliance":
                    applianceTags.push(item);
                    document.getElementById("inputAppliance").value = "";
                    break;
                case "ustensil":
                    ustensilTags.push(item);
                    document.getElementById("inputUstensil").value = "";
                    break;
            }
            actionFilters();
            break;
        case "delete":
            switch (nameList) {
                case "ingredient":
                    ingredientTags = arrayRemove(ingredientTags, item);
                    break;
                case "appliance":
                    applianceTags = arrayRemove(applianceTags, item);
                    break;
                case "ustensil":
                    ustensilTags = arrayRemove(ustensilTags, item);
                    break;
            }
            actionFilters();
            break;
    }

}


/**   à faire la partie algo pour l'action de l'input de recherche et les champs avancés */
export function actionFilters(){
    let currentNameRecipeList = [];
    let counter = 0;
    
    /*récupérer le tableau des recettes sauvegarder dans le navigateur  */
     currentLocalRecipes = getLocalStorage();
    
    const inputSearch = document.getElementById("search-input").value;
    /*normalizeText : Unicode norme NFD, supprime certaines poncutations,...   */
    let inputNormalizeSearch = normalizeText(inputSearch);
    if (inputNormalizeSearch.length > 2) {
        console.log("valeur input recherche normalisé:",inputNormalizeSearch );

       

        for (const recipe of currentLocalRecipes) {
            let isDisplay = false;
            /* recherche dans le titre et la description */
            if ((normalizeText(recipe.name).includes(inputNormalizeSearch)) ||
               (normalizeText(recipe.description).includes(inputNormalizeSearch))  ){
                isDisplay = true;
            }
            /* continuer la recherche si pas de trouvé à l'étape précèdente */
            if (isDisplay == false) {
                /* recherche dans les ingrédients */
                for (const text of recipe.ingredients){
                    if (normalizeText(text.ingredient).includes(inputNormalizeSearch)){
                         isDisplay = true;
                         /* sortie de la boucle en cas de trouvé  */
                         break;
                    }
                }           
            }

            currentLocalRecipes[counter].display = isDisplay;
            counter++;
            
           
         
        } 
    }
    displayRecipe(currentLocalRecipes);
    displayTags();
    
}

    



export function displayTags(){
    let currentTagId = 0;
    let tagsList = "";
    document.getElementById("div-tags").innerHTML = "";

    /* tags ingrédients sélectionnés */    
    for (let tag of ingredientTags) {
        tagsList += showTag(currentTagId, "ingredient", tag);
        currentTagId++; /* incrémentation compteur tag  */
    }
    /* tags appareils sélectionnés */   
    for (let tag of applianceTags) {
        tagsList += showTag(currentTagId, "appliance", tag);
        // Incrémentation du compteur de tags créés pour chaque ID donné
        currentTagId++; /* incrémentation compteur tag  */
    }
     /* tags des ustensiles sélectionnés */   
     for (let tag of ustensilTags) {
        tagsList += showTag(currentTagId, "ustensil", tag);
        // Incrémentation du compteur de tags créés pour chaque ID donné
        currentTagId++; /* incrémentation compteur tag  */
    }
    document.getElementById("div-tags").innerHTML = tagsList;

     /* listeners pour supprimer les tags des champs avancés  */
     let ListTags = document.getElementById("div-tags").children;
     for (const tag of ListTags) {
         let type = "";
         console.log("tag text :",tag.innerText);
         
         if (ingredientTags.includes(tag.innerText)) {
             type = "ingredient";
         
         } else if(applianceTags.includes(tag.innerText)){
             type = "appliance";
         
         } else if(ustensilTags.includes(tag.innerText)){
             type = "ustensil";
         }

        /* listener sur les éléments tags rajoutés pour faire une suppression   */
         tag.lastElementChild.addEventListener("click", () =>{
            evenTag("delete", type, tag.innerText);            
         })
     }


}

/*  structure tag à afficher   */
export function showTag(id,name,currentTag) {
    let current=`<div class="tag bold ${name}Tag" id="tag${name}">
                            <span>${currentTag}</span>
                            <i class="fa-regular fa-circle-xmark fa-lg" id="deleteTag${id}"></i>
                        </div>`
    return current;
}


/**
 * suppression élément dans un tableau
 * @param {*} array tableau comportant élément à supprimer
 * @param {*} value élément à supprimer
 * @returns  retourne le tableau modifié (élément modifié)
 */
 export function arrayRemove(array, value) { 
    return array.filter(function(element){ 
        return element != value; 
    });
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



/** 
 * texte normalisé sans accent,pas de la plupart de ponctuation, pas de majuscule
 * @param text text non normalisé
 * @return texte normalisé */ 
export function normalizeText(text){
    return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[.,;:!\?\*"()°]/g, "")
}


/** recherche par liste algo native
* @param {keywords}  mot à cherche dans les recettes
* @param {nameList[]} nom de la liste dans la recette
* @returns {result[]} tableau de résultat
*/
export function searchByList (searchTxt, nameList, nameRecipe){
    const result = []
    for (const text of nameList) {
      if (normalizeText(text).includes(searchTxt)) {
        result.push(nameRecipe)
      }
    }
    return result
  }




import {getLocalStorage, setLocalStorage} from "./dataConnection.js";


/* Tableaux des tags */
let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];


export function IngredientsListMenu(){
    /* récupérer le tableau recette sauvegarder dans le local stockage du navigateur  */
    let recipesData = getLocalStorage();
    let recipesDataTrue = [];
    let ingredientsList = [];
    let TestArrayIngredient = [];
    /* sélectionne les recettes à display true   */
    for (const recipe of recipesData){
        if (recipe.display){
            recipesDataTrue.push(recipe);  
            TestArrayIngredient.push(recipe);            
        }
    }
    /*  enregistrer les ingrédients en minuscule dans une liste et par CSS
    mettre la première lettre en majuscule    */
    for (let index = 0; index < recipesDataTrue.length; index++) {
        let ingredients = recipesDataTrue[index].ingredients;
        ingredients.map(({ ingredient }) => {
        ingredientsList.push(`${ingredient}`.toLowerCase());
        });
    }
    /* pas de doublon */
    const ingredientsListUniqueSet = new Set(ingredientsList);
    /* convertir en tableau */
    const ingredientsListUnique = [...ingredientsListUniqueSet] 
    /* Tri avec la méthode sort() et localeCompare() nécessaire
    pour les accent et les majuscules */
    const sortedArray = ingredientsListUnique.sort(function (a, b) {
         return a.localeCompare(b);
    });
    const ingredientsListUniqueSort = sortedArray;
    return ingredientsListUniqueSort    
}

export function applianceListMenu(){
    /* récupérer le tableau recette sauvegarder dans le local stockage du navigateur  */
   let recipesData = getLocalStorage();
   let appliancesList = [];
   let recipesDataTrue = [];
    /* sélectionne les recettes à display true   */
   for (const recipe of recipesData){
        if (recipe.display){
            recipesDataTrue.push(recipe);  
        }
    }
     /*  enregistrer les appareils en minuscule dans une liste et par CSS
    mettre la première lettre en majuscule    */
   for (let index = 0; index < recipesDataTrue.length; index++) {
       let appliances = recipesDataTrue[index].appliance;
       appliancesList.push(`${appliances}`.toLowerCase());
   }
   /* pas de doublon */
   const appliancesListUniqueSet = new Set(appliancesList);
   /* convertir en tableau */
   const appliancesListUnique = [...appliancesListUniqueSet] ;
   /* Tri avec la méthode sort() et localeCompare() nécessaire
    pour les accent et les majuscules */
    const sortedArray = appliancesListUnique.sort(function (a, b) {
        return a.localeCompare(b);
   })   
   let appliancesListUniqueSort = sortedArray;
   return appliancesListUniqueSort  ; 
}

export function ustensilsListMenu(){
   /* récupérer le tableau recette sauvegarder dans le local stockage du navigateur  */
   let recipesData = getLocalStorage();
   let ustensilsList = [];
   let recipesDataTrue = [];
   /* sélectionne les recettes à display true   */
    for (const recipe of recipesData){
       if (recipe.display){
           recipesDataTrue.push(recipe);  
       }
    }
   for (let index = 0; index < recipesDataTrue.length; index++) {
       let ustensils = recipesDataTrue[index].ustensils;
       ustensilsList.push(ustensils);
   }
   /* récupérer les données du sous-tableau ustensil */
   const ustensilsListJoined = ustensilsList.flat().map((x) => x.toLowerCase());    
  /* Tri avec la méthode sort() et localeCompare() nécessaire
    pour les accent et les majuscules */
    const sortedArray = ustensilsListJoined.sort(function (a, b) {
        return a.localeCompare(b);
   }) 
   const ustensilsListSort = sortedArray;
    /* pas de doublon */
    const ustensilsListUniqueSet = new Set(ustensilsListSort);
    /* convertir en tableau */
    const ustensilsListUniqueSort = [...ustensilsListUniqueSet] ;
    /* convert Set to Array */
    return ustensilsListUniqueSort    
}


/**
 * affichage des recettes trié par ordre alphabétique
 */
export function displayRecipe(){
    const recipes = getLocalStorage();
    console.time("trie-quick_sort");
    const recipesSortName = quickSort(recipes);
    console.timeEnd("trie-quick_sort");
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
    /* affichage du message si aucun résultat*/
    if (!content){
        message.innerHTML =  `« Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.`;
    }
    else {
      dom.innerHTML = content;
    } 
}



/**
 * Gestion de l'affichage des menus de filtres
 * @param {*} block nom du menu à  afficher/cacher
 * @param {*} action afficher/masquer des menus filtres
 */
 export function FiltersListDisplay(block, action) {
    // let childrenList = null;
    switch (block) {
        case "ingredients":
            // childrenList = document.getElementById("filterIngredients").children;
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
        case "appliances":
            // childrenList = document.getElementById("filterAppliances").children;
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
            // childrenList = document.getElementById("filterUstensils").children;          
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
 * Création de écouter d'évènement au chargement de la page
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
        FiltersListDisplay("appliances", "visible")
    });
    document.querySelector("#hideAppliancesList").addEventListener("click", () =>{
        FiltersListDisplay("appliances", "hide")
    });
    document.querySelector("#visibleUstensilsList").addEventListener("click", () =>{
        FiltersListDisplay("ustensils", "visible")
    });
    document.querySelector("#hideUstensilsList").addEventListener("click", () =>{
        FiltersListDisplay("ustensils", "hide")
    });

    /* listener sur les champs de recherche des filtres avancés */
    document.querySelector("#inputIngredient").addEventListener("keyup", (e) => {
        inputAvancedSearch("ingredient", e.target.value);
    });
    document.querySelector("#inputAppliance").addEventListener("keyup", (e) => {
        inputAvancedSearch("appliance", e.target.value);
    });
    document.querySelector("#inputUstensil").addEventListener("keyup", (e) => {
        inputAvancedSearch("ustensil", e.target.value);
    });
}


/**** input des champs avancés. Actualise la liste de chaque menu filtre 
 * en fonction de la recherche avancée
 * @param {*} nameFilter nom du menu filtre de la recherche 
 * @param {*} searchValue valeur saisie recherchée */ 
export function inputAvancedSearch(nameFilter,searchValue){
    // let block = "";
    let searchList = [];    
    let ingredientList = IngredientsListMenu();
    let applianceList =  applianceListMenu();
    let ustensilList =  ustensilsListMenu();

    switch (nameFilter) {
        case "ingredient":
            // block = document.getElementById("ingredientsList");
            if (searchValue.length > 0) {
                /* cherche correspondance entre la saisie input ingrédient et 
                la liste des ingrédients  */
                for (const ingredient of ingredientList) {
                    if (normalizeText(ingredient).includes(normalizeText(searchValue))) {
                        searchList.push(ingredient);
                    }
                }
              
                addItemsFilters(searchList,applianceList,ustensilList);
            } else {
                actionFilters();
            }
            break;
        case "appliance":
            // block = document.getElementById("appliancesList");
            if (searchValue.length > 0) {
                for (const appliance of applianceList) {
                    if (normalizeText(appliance).includes(normalizeText(searchValue))) {
                        searchList.push(appliance);
                    }
                }
                addItemsFilters(ingredientList,searchList,ustensilList);
            } else {
                actionFilters();
            }
            break;
        case "ustensil":
            // block = document.getElementById("ustensilsList");
            if (searchValue.length > 0)  {
                for (const ustensil of ustensilList) {
                    if (normalizeText(ustensil).includes(normalizeText(searchValue))) {
                        searchList.push(ustensil);
                    }
                }
                addItemsFilters(ingredientList,applianceList,searchList);
            } else {
                actionFilters();
            }
            break;
    }

  
}

/**
 * Afficher les ingrédients/appareils/ustensiles restants  suivants les sélections
 * @param {*} ingredientList Tableau ingrédients restants
 * @param {*} ingredientList Tableau appareils restants
 * @param {*} ustensilList Tableau  ustensiles restants
 */
export function addItemsFilters(ingredientList,applianceList,ustensilList){
       let itemsIngredientList = "";
       let itemsApplianceList = "";
       let itemsUstensilList = "";       
       let createdItems = null;
   
       
       /* mise à jour liste des ingrédients dans le menu filtre */
       if (ingredientList.length == 0 ) {
        itemsIngredientList = "Pas de correspondance";
       } else {        
           for (const ingredient of ingredientList) {
               if (!ingredientTags.includes(ingredient)) {
                  itemsIngredientList += showItemsAdvanced(ingredient);
               }
           }
       }    
       /* afficher la liste des ingrédients mise à jour  du menu filtre  */    
       document.getElementById("ingredientsList").innerHTML = itemsIngredientList;       
       /*écouter d'évènement de la liste des ingrédients menu filtre pour la
       création des Tags */
       createdItems = document.getElementById("ingredientsList").children;
       for (const item of createdItems) {
           item.addEventListener("click", () =>{
                evenTag("add", "ingredient", item.innerText);            
           })
       }

       /* mise à jour liste des appareils dans le menu filtre */
       if (applianceList.length == 0 ) {
        itemsApplianceList = "Pas de correspondance";
       } else {     
           for (const appliance of applianceList) {
               if (!applianceTags.includes(appliance)) {
                itemsApplianceList += showItemsAdvanced(appliance);
               }
           }   
       } 
       /* afficher la liste des appareils mise à jour du menu filtre  */  
       document.getElementById("appliancesList").innerHTML = itemsApplianceList;       
        /*écouter d'évènement de la liste des appareils menu filtre pour la
       création des Tags */
       createdItems = document.getElementById("appliancesList").children;
       for (const item of createdItems) {
           item.addEventListener("click", () =>{
                evenTag("add", "appliance", item.innerText);            
           })
       }

      /* mise à jour liste des ustensiles dans le menu filtre */
       if (ustensilList.length == 0) {
        itemsUstensilList = "Pas de correspondance";
       } else {        
           for (const ustensile of ustensilList) {
               if (!ustensilTags.includes(ustensile)) {
                itemsUstensilList += showItemsAdvanced(ustensile);
               }
           }
       } 
        /* afficher la liste des ustensiles mise à jour du menu filtre  */  
       document.getElementById("ustensilsList").innerHTML = itemsUstensilList;
       
       /*écouter d'évènement de la liste des ustensiles menu filtre pour la
       création des Tags */  
       createdItems = document.getElementById("ustensilsList").children;
       for (const item of createdItems) {
           item.addEventListener("click", () =>{
                evenTag("add", "ustensil", item.innerText);            
           })
       }
}



/** chargement liste ingrédients  */
export function ingredientsMenuDisplay(){
    let content = [];
    let createdItems = null;
    let localRecipes= getLocalStorage();
    const ingredients = IngredientsListMenu(localRecipes);
    const ingredientsList =  document.querySelector("#ingredientsList")

     ingredients.forEach(ingredient => {
        content += `<div class="filterItem"><p>${ingredient}<p></div>`;
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


/** chargement liste appareils  et écoute évènement de la liste créée.*/
export function appliancesMenuDisplay(){
    let content = [];
    let createdItems = null;
    const appliances = applianceListMenu();
    const appliancesList =  document.querySelector("#appliancesList")

    appliances.forEach(appliance => {
        content += `<div class="filterItem"><p>${appliance}<p></div>`;
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
export function ustensilsMenuDisplay(){
    let content = [];
    let createdItems = null;
    const ustensils = ustensilsListMenu();
    const ustensilsList =  document.querySelector("#ustensilsList")

    ustensils.forEach(ustensil => {
        content += `<div class="filterItem"><p>${ustensil}<p></div>`;
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
 * Evènements des tags - mise à jour des tableaux des Tag ingrédients/appareils/ustensile
 * @param {*} action  "add" ou "delete" pour création ou suppression Tags 
 * @param {*} tagType pour création tag ingredient/appareil/ustensile
 * @param {*} content Texte du Tag
 */
export function evenTag(action,nameList,item){
    let duplicate = false;
    switch (action) {
        case "add":
            switch (nameList) {
                case "ingredient":
                    /* pas de doublon de tag à l'affichage  */
                    if (ingredientTags.includes(item)){
                        duplicate=true;
                    }else{
                        ingredientTags.push(item);
                        document.getElementById("inputIngredient").value = "";
                    }
                    break;
                case "appliance":
                    /* pas de doublon de tag à l'affichage  */
                    if (applianceTags.includes(item)){
                        duplicate=true;
                    }else{
                        applianceTags.push(item);
                        document.getElementById("inputAppliance").value = "";
                    }                    
                    break;
                case "ustensil":
                     /* pas de doublon de tag à l'affichage  */
                    if (ustensilTags.includes(item)){
                        duplicate=true;
                    }else{
                        ustensilTags.push(item);
                        document.getElementById("inputUstensil").value = "";
                    }                    
                    break;
            }
            /* si pas de doublon  */
            if (!duplicate){
                actionFilters();
            }            
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


/**en cours............ ALGO 2 méthodes de l'objet array
 *  actions des filtres pour trouver le(s) recette(s) */
export function actionFilters(){
    console.time("algo2");
    let index = 0;
    let isDisplay = true;
    let currentLocalRecipes= getLocalStorage();
    let inputSearch = document.getElementById("search-input").value;
    /*normalizeText : Unicode norme NFD, supprime certaines poncutations,...   */
    let inputNormalizeSearch = normalizeText(inputSearch);    
 
    if (inputNormalizeSearch.length < 3) {
        inputNormalizeSearch = "";
    }
    /* Si aucun filtre appliqué, affichage de toutes les recettes */
    if (inputNormalizeSearch == "" && 
        ingredientTags.length == 0 &&
        applianceTags.length == 0 &&
        ustensilTags.length == 0) {         
        for (const recipe of currentLocalRecipes){
            recipe.display = true;
        }
    }
    else{
        /* mettre la saisie du champs de recherche principal dans un tableau
        pour utiliser les méthodes array */
        let inputSearchArray = [];
        inputSearchArray.push(inputNormalizeSearch);
        /* pour les 4 bloc de recherche (principal et mot clés ingrédient/appareil/ustensile) 
        si rendre dans le bloc de recherche valeur true en sortie en cas de correspondance
        si un des 4 bloc retourne false en cas de non correspondance, la recette ne sera pas affiché */
        currentLocalRecipes.forEach(recipe => {
        
        isDisplay = inputSearchArray.every(
            (text) =>
                normalizeText(recipe.description).includes(normalizeText(text)) ||
                normalizeText(recipe.name).includes(normalizeText(text)) ||
                recipe.ingredients
                .map((ingredient) => normalizeText(ingredient.ingredient))
                .join(' ')
                .includes(normalizeText(text))
            ) && (
                ingredientTags.every((ingredientTag) =>
                    recipe.ingredients
                    .map((ingredient) =>
                    normalizeText(ingredient.ingredient)
                )
                .includes(normalizeText(ingredientTag)))
            ) && (
                applianceTags.every(
                (applianceTag) =>
                normalizeText(recipe.appliance) === normalizeText(applianceTag)
            )
            ) && (
                ustensilTags.every((ustensilTag) =>
                recipe.ustensils
                .map((ustensil) => normalizeText(ustensil))
                .includes(normalizeText(ustensilTag))
                )
            ) 
            /* mis à jour du champs display à true ou false de chaque recette
            du tableau recette  */
            currentLocalRecipes[index].display = isDisplay;
            index++;
        });   
           
    }
     /* enregister le tableau des recettes à jour pour l'affichage dans le local
    stockage du navigateur  */
    setLocalStorage(currentLocalRecipes)
    console.timeEnd("algo2");
    


    /* affichage mise à jour des recettes et des listes ingredient/appareil/ustensile  */
    displayRecipe();
    ingredientsMenuDisplay();
    appliancesMenuDisplay();
    ustensilsMenuDisplay();    
    displayTags();
    
}

/* affichage des tag champs avancés ingrédients/appareils/ustensiles */
export function displayTags(){
    let indexTagId = 0;
    let tagsList = "";
    document.getElementById("div-tags").innerHTML = "";

    /* tags ingrédients sélectionnés */    
    for (let tag of ingredientTags) {
        tagsList += showTag(indexTagId, "ingredient", tag);
        indexTagId++; /* incrémentation compteur tag  */
    }
    /* tags appareils sélectionnés */   
    for (let tag of applianceTags) {
        tagsList += showTag(indexTagId, "appliance", tag);
        // Incrémentation du compteur de tags créés pour chaque ID donné
        indexTagId++; /* incrémentation compteur tag  */
    }
     /* tags des ustensiles sélectionnés */   
     for (let tag of ustensilTags) {
        tagsList += showTag(indexTagId, "ustensil", tag);
        // Incrémentation du compteur de tags créés pour chaque ID donné
        indexTagId++; /* incrémentation compteur tag  */
    }
    document.getElementById("div-tags").innerHTML = tagsList;

     /* écouter d'évènement pour supprimer les tags des champs avancés  */
     let ListTags = document.getElementById("div-tags").children;
     for (const tag of ListTags) {
         let type = "";
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

    
/*  structure éléments de recherche avancé par les saisies input avancé   */
export function showItemsAdvanced(filterName) {
    let current = `<div class="filterItem"><p>${filterName}<p></div>`
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
          a = normalizeText(a.name);
          b = normalizeText(b.name);
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
 * @param {*}text text non normalisé
 * @return {*} texte normalisé */ 
export function normalizeText(text){
    return text
    .toLowerCase() /*tout en mijuscule  */
    .trim()    /* retirer les blancs en début et fin  */
    .normalize("NFD") /*  la forme de normalisation Unicode à utiliser   */
    .replace(/[\u0300-\u036f]/g, "") /* caractère spécifique à enlever  */
    .replace(/œ/g, "oe") /* caractère spécifique à modifier  */
    .replace(/æ/g, "ae") /* caractère spécifique à modifier  */
    .replace(/[.,;:!*"()°]/g,"") /* caractère spécifique à enlever  */
}



/** 
 * algorithme Le tri rapide (quicksort)  ou tri pivot pour le tableau des recettes
 * Le principe de fonctionnement est basé sur le concept du pivot
 * @param {*} tableau non trié
 * @return {*} tableau trié*/ 
export function quickSort(recipes) {
    /* stop boucle si reste 1 seul element */
    if (recipes.length < 2) return recipes;
    /* valeur pivot */
    let pivot = recipes[0];
    /* sous-tableau elements < pivot */
    let lesser = [];
    /*  sous-taleau elements > pivot */
    let greater = [];
    /*  boucle sur tableau recettes */
    for (let i = 1; i < recipes.length; i++) {
      /*  quick sort sur noms recettes */
      if (recipes[i].name > pivot.name) greater.push(recipes[i]);
      else lesser.push(recipes[i]);
    }
    // fusion des 2 sous-tableaux
    return quickSort(lesser).concat(pivot, quickSort(greater));
  }



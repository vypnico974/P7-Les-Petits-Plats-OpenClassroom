import {getLocalStorage, setLocalStorage} from "./dataConnection.js";

/* Tableaux des tags */
let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

/**
 * récupére la liste des ingrédients par ordre alphabétique
 * @param {*} recipes tableau des recettes
 * @return {*} ingredientsListUniqueSort tableau liste ingrédients */
export function IngredientsListMenu(recipes){
    let recipesDataTrue = [];
    let ingredientsList = [];
    if (!recipes) {
        recipes = getLocalStorage()
    }
    /* récupérer les recettes à display true  */
    recipesDataTrue = recipeTrue(recipes)
    /*  enregistrer les ingrédients en minuscule dans une liste et par CSS
    mettre la première lettre en majuscule    */
    recipesDataTrue.forEach(recipe => {
        let ingredients = recipe.ingredients;
        ingredients.map(({ ingredient }) => {
            ingredientsList.push((ingredient.toLowerCase()));
        });
    })
    /* pas de doublon */
    const ingredientsListUniqueSet = new Set(ingredientsList);
    /* convertir en tableau */
    const ingredientsListUnique = [...ingredientsListUniqueSet] 
    /* trie tableau ordre alphabétique */
    const ingredientsListUniqueSort = sortArray(ingredientsListUnique);
    return ingredientsListUniqueSort    
}

/**
 * récupére la liste des appareils par ordre alphabétique
 * @param {*} recipes tableau des recette
 * @return {*} appliancesListUniqueSort tableau liste appareils */
export function applianceListMenu(recipes){
   let appliancesList = [];
   let recipesDataTrue = [];
   if (!recipes) {
    recipes = getLocalStorage()
    }
   /* récupérer les recettes à display true  */
    recipesDataTrue = recipeTrue(recipes)
    /*  enregistrer les appareils en minuscule dans une liste et par CSS
    mettre la première lettre en majuscule    */
    recipesDataTrue.forEach(recipe => {
       appliancesList.push((recipe.appliance.toLowerCase()));
    });
   /* pas de doublon */
   const appliancesListUniqueSet = new Set(appliancesList);
   /* convertir en tableau */
   const appliancesListUnique = [...appliancesListUniqueSet] ;
   /* trie tableau ordre alphabétique */  
   let appliancesListUniqueSort = sortArray(appliancesListUnique);
   return appliancesListUniqueSort  ; 
}

/**
 * récupére la liste des ustensiles par ordre alphabétique
 * @param {*} recipes tableau des recettes 
 * @return {*} ustensilsListUniqueSort tableau liste ustensiles */
export function ustensilsListMenu(recipes){
   let ustensilsList = [];
   let recipesDataTrue = [];
   if (!recipes) {
    recipes = getLocalStorage()
    }
   /* récupérer les recettes à display true   */
   recipesDataTrue = recipeTrue(recipes)
   recipesDataTrue.forEach(recipe => {
   ustensilsList.push(recipe.ustensils);
   });
   /* récupérer les données des sous-tableau ustensil dans un seul tableau */
   const ustensilsListJoined = ustensilsList.flat().map((x) => x.toLowerCase());    
   /* Tri tableau ordre alphabétique */
   const ustensilsListSort = sortArray(ustensilsListJoined);
   /* pas de doublon */
   const ustensilsListUniqueSet = new Set(ustensilsListSort);
   /* convertir en tableau */
   const ustensilsListUniqueSort = [...ustensilsListUniqueSet] ; 
   return ustensilsListUniqueSort    
}


 /**
 * affichage des recettes trié par ordre alphabétique 
 * @param {*} recipes tableau des recettes */
export function displayRecipe(recipes){
    if (!recipes) {
        recipes = getLocalStorage()
    }
 //   console.time("trie-quick_sort"); /* début mesure durée d'excution trie sort   */
    const recipesSortName = quickSort(recipes);
 //   console.timeEnd("trie-quick_sort"); /*fin  mesure durée d'excution trie sort   */
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
 * @param {*} action afficher/masquer des menus filtres*/
 export function FiltersListDisplay(block, action) {
    switch (block) {
        case "ingredients":
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

/* écouteurs d'évènements au chargement de la page */
 export function listenersLoad(){
    /* écouteur d'évènement sur le champ de recherche */
     document.querySelector("#search-input").addEventListener("keyup", actionFilters);
  
    /* écouteur d'évènement sur les boutons des filtres pour afficher/réduire les listes */
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

    /* écouteur d'évènement sur les champs de recherche des filtres avancés */
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
    let searchList = [];    
    let ingredientList = IngredientsListMenu();
    let applianceList =  applianceListMenu();
    let ustensilList =  ustensilsListMenu();

    switch (nameFilter) {
        case "ingredient":
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
 * @param {*} ustensilList Tableau  ustensiles restants */
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
    /*écouteur d'évènement de la liste des ingrédients menu filtre pour la
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
    /*écouteur d'évènement de la liste des appareils menu filtre pour la
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
       
    /*écouteur d'évènement de la liste des ustensiles menu filtre pour la
    création des Tags */  
    createdItems = document.getElementById("ustensilsList").children;
       for (const item of createdItems) {
           item.addEventListener("click", () =>{
                evenTag("add", "ustensil", item.innerText);            
        })
    }
}

/**
 * affichage menu liste ingrédients 
 * @param {*} recipes tableau des recettes */
export function ingredientsMenuDisplay(recipes){
    let content = [];
    let createdItems = null;
    if (!recipes) {
        recipes = getLocalStorage()
    }
    const ingredients = IngredientsListMenu(recipes);
    const ingredientsList =  document.querySelector("#ingredientsList")

    ingredients.forEach(ingredient => {
        content += `<div class="filterItem"><p>${ingredient}<p></div>`;
    });

    ingredientsList.innerHTML = content;

    /* écouteur d'évènement de la liste des ingrédients pour la création des tags ingrédients */
    createdItems = ingredientsList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
            evenTag("add", "ingredient", item.innerText);            
        })
    }
}   


/**
 * Affichage menu liste des appareils
 * @param {*} recipes tableau des recettes */
export function appliancesMenuDisplay(recipes){
    let content = [];
    let createdItems = null;
    if (!recipes) {
        recipes = getLocalStorage()
    }
    const appliances = applianceListMenu(recipes);
    const appliancesList =  document.querySelector("#appliancesList")

    appliances.forEach(appliance => {
        content += `<div class="filterItem"><p>${appliance}<p></div>`;
    });

    appliancesList.innerHTML = content;

     /* écouteur d'évènement de la liste des appareils pour la création des tags appareils */
    createdItems = appliancesList.children;
    for (const item of createdItems) {
        item.addEventListener("click", () =>{
            evenTag("add", "appliance", item.innerText);            
        })
    }    
}



/**
 * Affichage menu liste ustensiles 
 * @param {*} recipes tableau des recettes */
export function ustensilsMenuDisplay(recipes){
    let content = [];
    let createdItems = null;
    if (!recipes) {
        recipes = getLocalStorage()
    }
    const ustensils = ustensilsListMenu(recipes);
    const ustensilsList =  document.querySelector("#ustensilsList")

    ustensils.forEach(ustensil => {
        content += `<div class="filterItem"><p>${ustensil}<p></div>`;
    });

    ustensilsList.innerHTML = content;

    /* écouteur d'évènement de la liste  des ustensiles pour la création des tags ustensiles */
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
 * @param {*} content Texte du Tag */
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


/**ALGO 2 méthodes de l'objet array
 *  actions des filtres pour filtrer le(s) recette(s) */
export function actionFilters(){
  //  console.time("algo2"); /* début de mesure de la durée d'excécution algo2   */
    let index = 0;
    let isDisplay = true;
    let currentLocalRecipes= getLocalStorage();
    let inputSearch = document.getElementById("search-input").value;
    /*normalizeText : Unicode norme NFD, pas d'accent, supprime certaines poncutations,...   */
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
        pour utiliser les méthodes array(tableau) */
        let inputSearchArray = [];
        inputSearchArray.push(inputNormalizeSearch);
        /* pour les 4 bloc de recherche (principal et mot clés ingrédient/appareil/ustensile) 
        si rendre dans le bloc de recherche valeur true en sortie en cas de correspondance
        si un des 4 bloc retourne false en cas de non correspondance, la recette ne sera pas affiché 
        si un bloc n'est pas active, le tableau correspond à ce bloc est vide, et la particularité
        de la méthode every est qu'elle retourne true pour un tableau vide  */  
        /*  attention pour la méthode includes : 
        const tableau = ['bananes', 'poire'];   const text = 'bananes poire'
        console.log(tableau.includes('banane'));  //  faux
        console.log(text.includes('banane'));  // vrai  */      
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
     /* enregister le tableau des recettes à jour des fitres dans le local
    stockage du navigateur  */
    setLocalStorage(currentLocalRecipes)
  //  console.timeEnd("algo2"); /* fin de mesure de la durée d'excécution de l'algo2   */
    
    /* affichage mise à jour des recettes filtrées et des listes ingredient/appareil/ustensile  */
    displayRecipe(currentLocalRecipes);
    ingredientsMenuDisplay(currentLocalRecipes);
    appliancesMenuDisplay(currentLocalRecipes);
    ustensilsMenuDisplay(currentLocalRecipes);    
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
        /* Incrémentation du compteur de tags créés pour chaque Id donné */
        indexTagId++; /* incrémentation compteur tag  */
    }
     /* tags des ustensiles sélectionnés */   
     for (let tag of ustensilTags) {
        tagsList += showTag(indexTagId, "ustensil", tag);
        /* Incrémentation du compteur de tags créés pour chaque Id donné */
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

        /* écouteur d'évènement sur les éléments tags rajoutés pour faire une suppression   */
         tag.lastElementChild.addEventListener("click", () =>{
            evenTag("delete", type, tag.innerText);            
        })
    }
}


/**
* structure tag à afficher 
* @param {*} id id tag
* @param {*} typeTag type ingredient/appareil/ustensile
* @param {*} currentTag nom du tag
* @returns {*} current retourne string correspondant structure HTML */
export function showTag(id,typeTag,currentTag) {
    let current=`<div class="tag bold ${typeTag}Tag" id="tag${typeTag}">
                    <span>${currentTag}</span>
                    <i class="fa-regular fa-circle-xmark fa-lg" id="deleteTag${id}"></i>
                </div>`
    return current;
}

    

/**
* structure éléments de recherche avancé par les saisies input avancé 
* @param {*} array tableau comportant élément à supprimer 
* @returns {*} current retourne string correspondant structure HTML */
export function showItemsAdvanced(filterName) {
    let current = `<div class="filterItem"><p>${filterName}<p></div>`
    return current;
}

/**
 * suppression élément dans un tableau
 * @param {*} array tableau comportant élément à supprimer
 * @param {*} value élément à supprimer
 * @returns  retourne le tableau modifié (élément modifié) */
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
 * texte normalisé sans accent,pas de majuscule, remplace certaines lettres et signes de ponctuation
 * @param {*}text text non normalisé
 * @return {*} texte normalisé */ 
export function normalizeText(text){
    return text
    .toLowerCase() /*tout en mijuscule  */
    .trim()    /* retirer les blancs en début et fin  */
    .normalize("NFD") /*  la forme de normalisation Unicode à utiliser   */
    .replace(/[\u0300-\u036f]/g, "") /* caractère spécifique(accent) à enlever  */
    .replace(/œ/g, "oe") /* caractère spécifique à remplacer  */
    .replace(/æ/g, "ae") /* caractère spécifique à remplacer  */
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
    /* fusion des 2 sous-tableaux */
    return quickSort(lesser).concat(pivot, quickSort(greater));
  }


/**  Tri avec la méthode sort() et localeCompare() nécessaire
pour les accent et les majuscules  pour un tableau
 * @param {*} tableau non trié
 * @return {*} sortedArray tableau trié*/ 
function sortArray(tab){
    const sortedArray = tab.sort(function (a, b) {
        return a.localeCompare(b);
    })
    return sortedArray;
}

/**  retourne les recettes à display true   
* @param {*} tableau recettes
* @return {*} tableau recettes à display true*/ 
function recipeTrue(recipesDataTrue) {
      let array = []
      recipesDataTrue.forEach(recipe => {
        if (recipe.display){
            array.push(recipe);  
            }
        })
    return array    
}


    
   


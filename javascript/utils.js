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
    console.time("trie-sort");
    const recipesSortName = sortByName(recipes);
    console.timeEnd("trie-sort");
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


/* actions des filtres pour trouver recette(s) */
export function actionFilters(){
    /******  ALGO 1 -- boucle native FOR ***************/
    console.time("algo1"); /* debut mesure du temps d'exécution de l'algo 1    */    
    let currentLocalRecipes= getLocalStorage();
    //console.log(currentLocalRecipes);    
    let isDisplay = "";
    let inputSearch = document.getElementById("search-input").value;
    let index = 0;
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
        /* la mis à jour display à true  pour toutes les recettes est sauvegardée dans
         le stockage local du navigateur */
        setLocalStorage(currentLocalRecipes);
    }
    else{
       /*  recherche pour chaque recette  */
        for (const recipe of currentLocalRecipes) {
            /* 4 bloc de recherches : une recherche principale par le champs recherche une recette
            et les 3 trois champs avancés (ingrédient/appareil/ustensile)
            en fonctions résultat de ces 4 blocs, affichage ou pas de la recette */
            let isDisplayMain = true;
            /*  recherche principale   */
            /* début de la recherche à partir de 3 caractères    */
           if (inputNormalizeSearch.length >  2){                
                /* recherche principale dans le titre  */
                if (!(normalizeText(recipe.name).includes(inputNormalizeSearch))){
                    isDisplayMain = false;
                }
                /* si pas de résultat, la recherche principale continue dans la
                description   */
                if (!isDisplayMain){
                    if (!(normalizeText(recipe.description).includes(inputNormalizeSearch))){
                        isDisplayMain = false;
                    }else{
                        isDisplayMain = true;
                    }
                    /* si pas de résultat, la recherche principale continue dans les
                    ingrédients   */
                    if (!isDisplayMain){
                        for (const text of recipe.ingredients){
                            if (normalizeText(text.ingredient).includes(inputNormalizeSearch)){
                                isDisplayMain = true;
                                /* sortie de la boucle en cas de trouvé  */
                                break;
                            }
                        }  
                    }
                } 
            }        
            /* champs avancé ingrédients  */
            let isDisplayIngredient = true;
            if (ingredientTags.length > 0) {
                let ingredientList = [];
                /* récupérer tout les ingrédients de la recette dans un tableau   */
                for (const ingredient of recipe.ingredients){   
                    ingredientList.push(normalizeText(ingredient.ingredient));
                }
                 /* pour chaque ingrédient selectionné, vérification qu'il est présent dans
                 les ingrédients de la recette, si non présent, fin de la recherche pour ce
                 champs sélectionné et la recette ne sera pas affiché */
                for (const ingredientTag of ingredientTags ){                    
                    if (!ingredientList.includes(normalizeText(ingredientTag))){
                        isDisplayIngredient = false;
                        break 
                    }
                }
            }
             /* champs avancé appareil    */
            let isDisplayAplliance = true;
            if (applianceTags.length > 0) {               
                /* pour chaque appareil selectionné, vérification qu'il est présent pour
                l'appareil de la recette, si non présent, fin de la recherche pour ce
                champs sélectionné et la recette ne sera pas affiché */
                for (const applianceTag of applianceTags ){
                    if (! normalizeText(recipe.appliance).includes(normalizeText(applianceTag))){
                        isDisplayAplliance = false;
                        break
                    }
                }
            }
            /* champs avancé ustensile    */
            let isDisplayUstensil = true;
            if (ustensilTags.length > 0) {
                let ustensilList = recipe.ustensils.toLocaleString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(',');
                /* pour chaque ustensil selectionné, vérification qu'il est présent dans
                 les ustensiels de la recette, si non présent, fin de la recherche pour ce
                 champs sélectionné et la recette ne sera pas affiché */
                for (const ustensilTag of ustensilTags ){
                    if (!ustensilList.includes(ustensilTag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
                        isDisplayUstensil = false;
                        break
                    }
                }
            }
            /*en fonction résultat de ces 4 bloc, affichage ou non de la recette   */
            isDisplay = isDisplayMain && isDisplayIngredient && isDisplayAplliance && isDisplayUstensil
            /* display true/false pour la recette */
            currentLocalRecipes[index].display = isDisplay;
            index++;  
        }
        /* enregisterement de la mise à jour tableau recette display true/false dans le local
        stockage du navigateur */
        setLocalStorage(currentLocalRecipes);
    }
    console.timeEnd("algo1"); /* fin mesure du temps d'exécution de l'algo 1    */ 



// let allRecipes = getLocalStorage()
// let filteredRecipes = []

//  let recipeTextFilter = ['citron']
// // let recipeTextFilter = ['coco', 'citron']
// // let recipeTextFilter = ['citron', 'coco', 'couteau', 'poisson', 'verre', 'ananas']

// filteredRecipes = allRecipes.filter((recipe) => {
//     return recipeTextFilter.every(
//         (word) =>
//             recipe.description.toLowerCase().includes(word) ||
//             recipe.name.toLowerCase().includes(word) ||
//             recipe.ingredients
//                 .map((ingredient) => ingredient.ingredient)
//                 .join(' ')
//                 .toLowerCase()
//                 .includes(word)
//     )
// })

// console.log(filteredRecipes)


    /********** ALGO 2 TEST *******************************/
    
    console.time("algo2");
    
   // console.log(currentLocalRecipes);
   
     /* Si aucun filtre appliqué, affichage de toutes les recettes */
    if (inputNormalizeSearch == "" && 
    ingredientTags.length == 0 &&
    applianceTags.length == 0 &&
    ustensilTags.length == 0) {         
    for (const recipe of currentLocalRecipes){
         recipe.display = true;
     }
     /* mis à jour tout display à true des recettes dans
      le stockage local du navigateur */
     setLocalStorage(currentLocalRecipes);
     }
    else{
        let isDisplayRecipeArray = []
        let inputSearchArray = [];
        inputSearchArray.push(inputNormalizeSearch);
        isDisplayRecipeArray = currentLocalRecipes.filter(recipe => {
            return (
                inputSearchArray.every(
                    (text) =>
                        normalizeText(recipe.description).includes(text) ||
                        normalizeText(recipe.name).includes(text) ||
                        recipe.ingredients
                            .map((ingredient) => normalizeText(ingredient.ingredient))
                            .join(' ')
                            .includes(text)
                ) &&    (
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
            )
        })
        console.time("trie-quick sort");
        console.log("resultat algo2 :", quickSort(isDisplayRecipeArray));
        console.timeEnd("trie-quick sort");
        console.timeEnd("algo2");


        // index = 0;
        // currentLocalRecipes.forEach(recipe => {
        //     ingredientsList = [];
        //     ustensilList = []
        //     isDisplayMainAlgo2 = true;
        //     isDisplayIngredientAlgo2 = true;
        //     isDisplayApplianceAlgo2 = true;
        //     isDisplayUstensilAlgo2 = true;         
            
        //     // if (inputNormalizeSearch.length >  2){ 

        //     //     let inputSearchArray = [];
        //     //     inputSearchArray.push(inputNormalizeSearch);
        //     //     isDisplayMainAlgo2 = inputSearchArray.every(
        //     //         (text) =>
        //     //             normalizeText(recipe.description).includes(text) ||
        //     //             normalizeText(recipe.name).includes(text) ||
        //     //             recipe.ingredients
        //     //                 .map((ingredient) => normalizeText(ingredient.ingredient))
        //     //                 .join(' ')
        //     //                 .includes(text)
        //     //     )
        //     //     //console.log(inputNormalizeSearch,isDisplayMainAlgo2 );
          
        //     // }

        //     isDisplayIngredientAlgo2 = true;
        //     /* champs avancé ingrédients  */           
        //     if (ingredientTags.length > 0) {  
        //             recipe.ingredients.map(({ ingredient }) => {
        //             ingredientsList.push(normalizeText(`${ingredient}`));
        //             })        
        //         ingredientTags.forEach(tag => {
        //             if (!ingredientsList.includes(normalizeText(tag))){
        //                 isDisplayIngredientAlgo2 = false;
        //             } 
        //         })

        //         isDisplayIngredientAlgo2 = ingredientTags.every((ingredientTag) =>
        //         recipe.ingredients
        //             .map((ingredient) =>
        //                 normalizeText(ingredient.ingredient)
        //             )
        //             .includes(normalizeText(ingredientTag)) 
        //         )
        //     }

        //     isDisplayApplianceAlgo2 = true;
        //     /* champs avancé appareils  */              
        //     if (applianceTags.length > 0) {                  
        //         applianceTags.forEach(tag => {
        //             if (!normalizeText(recipe.appliance).includes(normalizeText(tag))){
        //                isDisplayApplianceAlgo2 = false;
        //             } 
        //         })
        //     }

        //     isDisplayApplianceAlgo2 =applianceTags.every(
        //         (applianceTag) =>
        //         normalizeText(recipe.appliance) === normalizeText(applianceTag)
        //     )

            
        //     isDisplayUstensilAlgo2 = true
        //     /* champs avancé ustensils  */           
        //     if (ustensilTags.length > 0) {                  
        //         ustensilList = recipe.ustensils.toLocaleString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(',') ;                              
        //         ustensilTags.forEach(tag => {
        //             if (!ustensilList.includes(tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
        //                 isDisplayUstensilAlgo2 = false;
        //             } 
        //         })
        //     }

        //     isDisplayUstensilAlgo2 =ustensilTags.every((ustensilTag) =>
        //             recipe.ustensils
        //                 .map((ustensil) => normalizeText(ustensil))
        //                 .includes(normalizeText(ustensilTag))
        //     )


        //     isDisplay =  isDisplayMainAlgo2 && isDisplayIngredientAlgo2 && isDisplayApplianceAlgo2 && isDisplayUstensilAlgo2
            
        //     /* enregisterement mise à jour tableau recette display true/false dans le local
        //     stockage du navigateur */
        //    //currentLocalRecipes[index].display = isDisplay;
        //     index++;    
        //    // setLocalStorage(currentLocalRecipes); 

        // });




    }
    


    /* affichage des recettes et des champs avancés modifié(s)  */
    displayRecipe();
    ingredientsMenuDisplay();
    appliancesMenuDisplay();
    ustensilsMenuDisplay();    
    displayTags();
    
}

/* affichage des tag provenants des champs avancés ingrédients/appareils/ustensiles */
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
 *  Son fonctionnement est centré autour du concept du pivot
 * @param {*} tableau non trié
 * @return {*} tableau trié*/ 
export function quickSort(recipes) {
    // stop boucle si reste 1 seul element
    if (recipes.length < 2) return recipes;
    // valeur pivot
    let pivot = recipes[0];
    // sous-tableau elements < pivot
    let lesser = [];
    // sous-taleau elements > pivot
    let greater = [];
    // boucle sur tableau recettes
    for (let i = 1; i < recipes.length; i++) {
      // quick sort sur noms recettes
      if (recipes[i].name > pivot.name) greater.push(recipes[i]);
      else lesser.push(recipes[i]);
    }
    // fusion des 2 sous-tableaux
    return quickSort(lesser).concat(pivot, quickSort(greater));
  }


// export function mergeSort(array){   
//         // divide array until there's only one element
//         // the recursive stop condition !
//         if (array.length > 1) {
//           // get the middle index of the current division
//           const middleIndex = Math.floor(array.length / 2)
//           // get left side
//           const leftSide = array.slice(0, middleIndex)
//           // get right side
//           const rightSide = array.slice(middleIndex)
//           // call recursively for the left part of the data
//           mergeSort(leftSide)
//           // call recursively for the right part of the data
//           mergeSort(rightSide)
//           // default setup of the indexes
//           let leftIndex = 0, rightIndex = 0, globalIndex = 0
//           // loop until we reach the end of the left or the right array
//           // we can't compare if there is only one element
//           while(leftIndex > leftSide.length && rightIndex > rightSide.length) {
//             // actual sort comparaison is here
//             // if the left element is smaller its should be first in the array
//             // else the right element should be first
//             // move indexes at each steps
//             if (leftSide[leftIndex] < rightSide[rightIndex]) {
//               array[globalIndex] = leftSide[leftIndex]
//               leftIndex++
//             } else {
//               array[globalIndex] = rightSide[rightIndex]
//               rightIndex++
//             }
//             globalIndex++
//           }
//           // making sure that any element was not left behind during the process
//           while(leftIndex < leftSide.length) {
//             array[globalIndex] = leftSide[leftIndex]
//             leftIndex++
//             globalIndex++
//           }
//           while(rightIndex < rightSide.length) {
//             array[globalIndex] = rightSide[rightIndex]
//             rightIndex++
//             globalIndex++
//           }
//         }
//         return array 
// }
import {getRecipes} from "./dataConnection.js";



async function initPage(){

  const recipesData = await getRecipes();

    function IngredientsFilter(recipesData){
        /*  get the list of all ingredients */
        let ingredientsList = [];
        for (let index = 0; index < recipesData.length; index++) {
            let ingredients = recipesData[index].ingredients;
            ingredients.map(({ ingredient }) => {
            ingredientsList.push(`${ingredient.toLowerCase()}`);
            });
        }
        console.log("liste ingrédients :",ingredientsList);
        /* no repeat */
        let ingredientsListUniqueSet = new Set(ingredientsList);
        /* convert Set to Array */
        let ingredientsListUnique = [...ingredientsListUniqueSet]    
        console.log("liste ingrédients unique :",ingredientsListUnique);
        /*  alphabetical order */
        let ingredientsListUniqueSort = ingredientsListUnique.sort();
        console.log("liste ingrédients trié :",ingredientsListUniqueSort);  

        return ingredientsListUniqueSort    
    }

    function appliancesFilter(recipesData){
         /*  get the list of all appliances */
        let appliancesList = [];
        for (let index = 0; index < recipesData.length; index++) {
            let appliances = recipesData[index].appliance;
            appliancesList.push(`${appliances.toLowerCase()}`);
        }
        console.log("liste appareils :",appliancesList);
        /* no repeat */
        let appliancesListUniqueSet = new Set(appliancesList);
        /* convert Set to Array */
        let appliancesListUnique = [...appliancesListUniqueSet]    
        console.log("liste appareils unique :",appliancesListUnique);
        /*  alphabetical order */
        let appliancesListUniqueSort = appliancesListUnique.sort();
        console.log("liste appareils trié :",appliancesListUniqueSort);  

        return appliancesListUniqueSort    
    }

    function ustensilsFilter(recipesData){
         /*  get the list of all appliances */
        let ustensilsList = [];
        for (let index = 0; index < recipesData.length; index++) {
            let ustensils = recipesData[index].ustensils;
            ustensilsList.push(ustensils);
        }
        console.log("liste ustensils :", ustensilsList);
       /* no repeat   */
        /* Embeds the values ​​from the subarray into the array and LowerCase elements */
        let ustensilsListJoined = ustensilsList.flat().map((x) => x.toLowerCase());      
        console.log("liste ustensils unique :",ustensilsListJoined);
        /*  alphabetical order */
        let ustensilsListUniqueSort = ustensilsListJoined.sort();
        console.log("liste ustensils trié :",ustensilsListUniqueSort); 
        
        /**** TEST ********/
        let ustensilsListUniqueSortTest = new Set(ustensilsListUniqueSort) 
         /* convert Set to Array */
         let ingredientsListUniqueTest = [...ustensilsListUniqueSortTest] 
         console.log("liste ustensils trié test :",ingredientsListUniqueTest); 

        return ustensilsListUniqueSort    
    }



      IngredientsFilter(recipesData);
      appliancesFilter(recipesData);
      ustensilsFilter(recipesData);

}
 



initPage();
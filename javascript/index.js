import {getLocalStorage, getRecipes, setLocalStorage} from "./dataConnection.js";
import { displayRecipe } from "./utils.js";



async function initPage(){

  const recipes = await getRecipes();
  
  setLocalStorage(recipes);

    function IngredientsFilter(){
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

    function appliancesFilter(){
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

    function ustensilsFilter(){
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



      IngredientsFilter();
      appliancesFilter();
      ustensilsFilter();
    // const recipe = getLocalStorage();
    // recipe[0].display = false;
    // setLocalStorage(recipe);
    displayRecipe();

}




initPage();
/*
const text = [1,2,3];
setLocalStorage(text);
const toto = getLocalStorage()
console.log(toto); */
import {getRecipes} from "./dataConnection.js";

async function initPage(){
    const recipesData = await getRecipes();
    console.log("data recipes:", recipesData);
}


initPage();
/*Lecture de recipes.json pour extraction des données
 @param   {}
 @return  {data.recipes} : tableau de données des recettes  */
export async function getRecipes() {
    try{
        const response = await fetch("./data/recipes.json");
        /* attendre la résolution de la promesse  */
        const data = await response.json(); 
      //  console.log(data);
        data.recipes.forEach(recipe => {
            recipe.display = true
        });
        return data.recipes; 
    }
    catch(err) {
        /* affichafe erreur */
        console.log("Une erreur se produit :", err);   
    }       
}

/* extrait le tableau text de l'objet data et l'enregistrer dans le stockage local du navigateur   */
export function setLocalStorage(data){
    const dataText = JSON.stringify(data);
    window.localStorage.setItem("recipesStorage",dataText);

}
/* récupérer le tableau text des data depuis le stockage local du navigateur */
export function getLocalStorage(){
   const response = window.localStorage.getItem("recipesStorage");
   return JSON.parse(response);
    
}



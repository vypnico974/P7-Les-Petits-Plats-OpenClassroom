/*Lecture de recipes.json pour extraction des données
 @param   {}
 @return  {data.recipes} : tableau de données des recettes  */
export async function getRecipes() {
    try{
        const response = await fetch("./data/recipes.json");
        /* attendre la résolution de la promesse  */
        const data = await response.json(); 
        return data.recipes; 
    }
    catch(err) {
        /* affichafe erreur */
        console.log("Une erreur se produit :", err);   
    }       
}


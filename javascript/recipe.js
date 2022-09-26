export default class Recipe{
    constructor(content){
        this.name = content.name;
        this.time = content.time;
        this.description = content.description;
        this.ingredients = content.ingredients;
        this.create();
    }
    create(){ /******* à completer   *******   */
        this.recipeDiv = `<article>
                          </article>`;
    }
}
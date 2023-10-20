import Fridge from "./fridge";
import { customFetch } from "./util/api"

class Oven{
        constructor(ele, fridge) {
            this.fridge = fridge
            this.ele = ele;
            this.ele.innerHTML = "<h1> Oven </h1>"
            this.recipePage = document.getElementById("recipe-page")
            this.recipe = document.querySelector('.recipe');
            this.ele.addEventListener('click', this.handleClick.bind(this))
        }


    handleClick() {
        if (this.recipePage.classList.contains('hidden')) {
            this.recipePage.classList.remove("hidden");  // Show recipe page 
            this.recipePage.classList.add("recipe-page");
        } else {
            this.recipePage.classList.add('hidden');    // Hide recipe page 
            this.recipePage.classList.remove("recipe-page");
        }
        // generate random recipe with ingredients 
        //render it on the recipe page 
        debugger
        this.generateRecipe()
    };

    generateRecipe(e) {
        // e.preventDefault();
        return customFetch(this.fridge.ingredientItems)  
    }

};

export default Oven;
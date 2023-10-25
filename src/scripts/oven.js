import Fridge from "./fridge";
import { customFetch } from "./util/api"
import Recipe from "./recipe";

class Oven{
        constructor(ele, fridge, drawer) {
            this.fridge = fridge
            this.drawer = drawer
            this.ele = ele;
            this.chart = document.getElementById("chart")
            this.recipeModal = document.getElementsByClassName("recipe-modal")[0]
            this.recipe = document.querySelector('.recipe');
            this.ele.addEventListener('click', this.displayModal.bind(this))
            this.button = document.getElementById("button")
            this.button.addEventListener('click', this.generateRecipe.bind(this))
            this.clearButton = document.getElementById("clearRecipe")
            this.clearButton.addEventListener('click', this.clearRecipes.bind(this))
            this.closeModalButton = document.getElementById("closeRecipeModal")
            this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
        }

    displayModal() {
        this.recipeModal.style.display = "flex" // Show the ingredients page
        debugger
    };

    closeModal() {
        this.recipeModal.style.display = "none"
    };


    // handleClick() {
    //     if (this.recipePage.classList.contains('hidden')) {
    //         this.recipePage.classList.remove("hidden");  // Show recipe page 
    //         this.recipePage.classList.add("recipe-page");
    //     } else {
    //         this.recipePage.classList.add('hidden');    // Hide recipe page 
    //         this.recipePage.classList.remove("recipe-page");
    //     }
    // };

   async generateRecipe(e) {
        let recipeList = this.recipe;
        let chartPage = document.getElementById("chart-page")
        let chartList = this.chart
        debugger
        if (localStorage.getItem("recipes") === null){
            let queryParams = this.fridge.ingredientItems + this.drawer.searchParams();
            await customFetch(queryParams)
    
            .then(data => {
                localStorage.setItem("recipes", JSON.stringify(data))
            })
        }
        // .then(data => {data.hits.forEach(hit => {
        //     console.log(hit)
            this.clearRecipes();
            let recipes = JSON.parse(localStorage.getItem("recipes"))
            console.log(recipes)
            let hit = recipes.hits[Math.floor(Math.random() * 20)]

            let recipe = new Recipe(hit);

            let recipeItem = document.createElement('li');
                recipeItem.innerText = recipe.label;
                recipeList.append(recipeItem);

            let recipeNutrients = document.createElement('li');
                recipeNutrients.innerText = recipe.calories;
                recipeList.append(recipeNutrients);

            let recipeImage = document.createElement('img');
                recipeImage.src = hit.recipe.image;
                
            let recipeLink = document.createElement('a')
                recipeLink.href = hit.recipe.url
                recipeLink.append(recipeImage)
                recipeList.append(recipeLink);
                recipeLink.target = "_blank"

            let pieChartContainer = document.createElement('div')
                pieChartContainer.classList.add('pie-chart-container')
                recipe.generatePieChart(pieChartContainer)
                chartList.append(pieChartContainer)
                chartPage.append(chartList)

            let bubbleChartContainer = document.createElement('div')
                bubbleChartContainer.classList.add('bubble-chart-container')
                recipe.generateBubbleChart(bubbleChartContainer)
                chartList.append(bubbleChartContainer)
                chartPage.append(chartList)

            let tooltipContainer = document.createElement('div')
                tooltipContainer.innerHTML = `<p id="macro">label</p>
                <p><span id="value"> value </span></p>`
                tooltipContainer.classList.add("tooltip")
                tooltipContainer.setAttribute("id", "tooltip")
                pieChartContainer.append(tooltipContainer)

    }

    clearRecipes() {
        while(this.recipe.firstChild) this.recipe.removeChild(this.recipe.firstChild);
        while(this.chart.firstChild) this.chart.removeChild(this.chart.firstChild);
    }

};

export default Oven;


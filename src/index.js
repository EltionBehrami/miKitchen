import Fridge from "./scripts/fridge"
import Oven from "./scripts/oven";
import Kitchen from "./scripts/kitchen";


fetch(`https://api.edamam.com/api/recipes/v2?&app_id=6278ead0&app_key=2117ecba95d2233dc31de3c80d9a9d1b&type=public`)
.then(response => response.json())
.then(data => console.log(data))

// fetch(`https://api.edamam.com/api/recipes/v2?q=chicken&app_id=6278ead0&app_key=2117ecba95d2233dc31de3c80d9a9d1b&type=public&diet=high-protein&health=gluten-free&cuisineType=Mexican&mealType=Dinner&dishType=Main%20course`)
// .then(response => response.json())
// .then(data => console.log(data))


document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("fridge");
    const recipeGenerator = document.getElementById("oven")
    // const kitchen = new Kitchen();
    const fridge = new Fridge(main);
    const oven = new Oven(recipeGenerator, fridge);
})


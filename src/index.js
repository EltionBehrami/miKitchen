import Fridge from "./scripts/fridge"
import Oven from "./scripts/oven";
import Drawer from "./scripts/drawer";


document.addEventListener("DOMContentLoaded", () => {
    const fridgeElement = document.getElementById("fridge");
    const recipeGenerator = document.getElementById("oven")
    const drawerElement = document.getElementById("drawer")
    const fridge = new Fridge(fridgeElement);
    const drawer = new Drawer(drawerElement)
    const oven = new Oven(recipeGenerator, fridge, drawer);
})


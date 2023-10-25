import Fridge from "./fridge"
import Oven from "./oven"
import Drawer from "./drawer"



class Dishwasher {
    constructor(ele, fridge, drawer, oven){
        this.ele = ele 
        this.fridge = fridge
        this.drawer = drawer
        this.oven = oven
        this.ele.addEventListener("click", this.reset.bind(this))
    }


    reset(){
        this.oven.clearRecipes()
        this.fridge.clearIngredients()
        this.drawer.resetParams()
    }
}

export default Dishwasher;
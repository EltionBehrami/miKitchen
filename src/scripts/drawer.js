class Drawer {
    constructor(ele) {
        this.ele = ele 
        this.ele.innerHTML = "<h1> Drawer</h1>"
        this.drawerPage = document.getElementById("drawer-page")
        this.ele.addEventListener('click', this.handleClick.bind(this))
        this.cuisine = document.getElementById("cuisine")
        this.diet = document.getElementById("diet")
        this.health = document.getElementById("health")
        this.mealType = document.getElementById("mealType")
        this.dishType = document.getElementById("dishType")
    }

    handleClick() {
        if (this.drawerPage.classList.contains('hidden')) {
            this.drawerPage.classList.remove("hidden");  // Show drawer page 
            this.drawerPage.classList.add("drawer-page");
        } else {
            this.drawerPage.classList.add('hidden');    // Hide drawer page 
            this.drawerPage.classList.remove("drawer-page");
        }
    }

    searchParams() {
        let params = ""
        if (this.diet.value !== "none") {
            params += `&diet=${this.diet.value}`
        } 
        
        if (this.cuisine.value !== "none") {
            params += `&cuisineType=${this.cuisine.value}`
        } 
        
        if (this.health.value !== "none") {
            params += `&health=${this.health.value}`
        } 
        
        if (this.mealType.value !== "none") {
            params += `&mealType=${this.mealType.value}`
        } 
        if (this.dishType.value !== "none") {
            params += `&dishType=${this.dishType.value}`
        }
        return params
    }


}

export default Drawer; 
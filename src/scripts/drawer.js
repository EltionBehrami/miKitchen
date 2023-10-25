class Drawer {
    constructor(ele) {
        this.ele = ele 
        // this.ele.innerHTML = "<h1> Drawer</h1>"
        this.drawerModal = document.getElementsByClassName("drawer-modal")[0]
        this.drawerModal.addEventListener('click', this.closeModal.bind(this));
        this.drawerPage = document.getElementById("drawer-page")
        this.ele.addEventListener('click', this.displayModal.bind(this))
        this.cuisine = document.getElementById("cuisine")
        this.diet = document.getElementById("diet")
        this.health = document.getElementById("health")
        this.mealType = document.getElementById("mealType")
        this.dishType = document.getElementById("dishType")
        this.button = document.getElementById("resetButton")
        this.button.addEventListener('click', this.resetParams.bind(this))
        // this.closeModalButton = document.getElementById("closeDrawerModal")
        // this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
    }


    displayModal() {
        this.drawerModal.style.display = "flex" // Show the ingredients page
        this.drawerPage.style.display = "flex" // Show the ingredients page
        debugger
    };

    closeModal() {
        this.drawerModal.style.display = "none"
        this.drawerPage.style.display = "none"
    };


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

    resetParams(){
        this.diet.value = "none"
        this.cuisine.value = "none"
        this.health.value = "none"
        this.mealType.value = "none"
        this.dishType.value = "none"
    }


}

export default Drawer; 
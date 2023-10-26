class Fridge {

    constructor(ele) {
        this.ele = ele;
        this.ingredientsModal = document.getElementsByClassName("ing-modal")[0]
        this.ingredientsModal.addEventListener('click', this.closeModal.bind(this));
        this.ingredientsPage = document.getElementById("ing-page")
        this.ingredientsForm = document.getElementById("ing-form")
        this.ingredientList = document.querySelector('.ingredients');
        this.userModal = document.getElementsByClassName("user-modal")[0]
        this.userModal.addEventListener('click', this.closeUserModal.bind(this));
        this.userPage = document.getElementById("user-page")
        this.ingredientItems = ''
        this.button = document.getElementById("clearButton")
        this.button.addEventListener('click', this.clearIngredients.bind(this))
        this.ele.addEventListener('click', this.displayModal.bind(this))
        this.ingredientsForm.addEventListener('submit', this.addIngredient.bind(this))
        this.ingredientList.addEventListener('click', this.deleteIngredient.bind(this))
        this.closeModalButton = document.getElementById("closeIngModal")
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
    }

    displayModal() {
            this.ingredientsModal.style.display = "flex" // Show the ingredients page
            this.ingredientsPage.style.display = "flex"
    };

    closeModal() {
        this.ingredientsModal.style.display = "none"
        this.ingredientsPage.style.display = "none"
    };

    closeUserModal(){
        this.userModal.style.display = "none"
        this.userPage.style.display = "none"
    }

    //event handler to add to ingredient list 
    addIngredient(e) {
        e.preventDefault();
        let input = document.querySelector("input[name='add-ingredient']");
        let value = input.value;
        if (this.ingredientItems) {
            localStorage.setItem('ingredientList', this.ingredientItems.concat(`, ${value}`));
            this.ingredientItems = localStorage.getItem('ingredientList');
        } else {
            localStorage.setItem('ingredientList', value);
        }
        this.ingredientItems = localStorage.getItem('ingredientList');
    this.updateList();
    this.ingredientsForm.reset()

    }

    
    deleteIngredient(e) {
        e.preventDefault()
        let ele = e.target;
        let itemText = ele.innerText;
        this.ingredientList.removeChild(ele);
        this.ingredientItems = this.ingredientItems.split(', ')
        .filter(item => item !== itemText)
        .join(', ');
    }

    //renders ingredientItems
    updateList() {
        let iL = this.ingredientList
        iL.innerHTML = '';
        this.ingredientItems.split(', ').forEach(function(item) {
            let newEle = document.createElement('li');
            newEle.innerText = item;
            iL.append(newEle);
        });
    }

    clearIngredients() {
        while(this.ingredientList.firstChild) this.ingredientList.removeChild(this.ingredientList.firstChild);
        this.ingredientItems = ""
    }
}

export default Fridge;
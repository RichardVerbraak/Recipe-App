import uuidv4 from "uuid/v4"
import { getRecipes, saveRecipes } from "./recipes";

const recipeName = document.querySelector(".recipe-name")
const instructionsArea = document.querySelector(".instructions-area")
const ingredientsList = document.querySelector(".ingredient-list")
const ingredientInput = document.querySelector(".ingredient-input")
const addIngredient = document.querySelector(".add-ingredient-button")
const deleteRecipe = document.querySelector(".delete-recipe")

// TODOS
// Setup delete recipe button to remove the whole recipe AND ingredients(?)

let recipes = getRecipes()
let ingredients = []

// If recipe.id matches location.hash --> change recipe name
const updateRecipe = () => {
    let foundRecipe = recipes.find((recipe) => {
        return recipe.id === location.hash.substring(1)
    })    
    
    foundRecipe.title = recipeName.value
    foundRecipe.steps = instructionsArea.value
    saveRecipes()
}

recipeName.addEventListener("input", (e) => {
    updateRecipe()
})

// Creates and renders the ingredient on click
addIngredient.addEventListener("click", (e) => {
    updateRecipe()
    createIngredient()
    renderIngredients()   
})

// Pushes ingredient to array and save to localStorage
const createIngredient = () => {
    ingredients.push({
        name: ingredientInput.value,
        id: location.hash.substring(1),
        uniqueID: uuidv4()
    })
    saveIngredients()
}


// Renders all ingredients with current recipe
const renderIngredients = () => {    
    ingredientsList.innerHTML = ""
    
    if (ingredients.length > 0) {
        const matchedIngredients = ingredients.filter((ingredient) => {
            return ingredient.id === location.hash.substring(1)
        })

        matchedIngredients.forEach((ingredient) => {
            makeIngredient(ingredient)
        })

    } else {    
        const emptyMessage = document.createElement("p")
        emptyMessage.classList.add("empty-message__ingredients")
        emptyMessage.textContent = "Hmmm, no ingredients?"
        ingredientsList.appendChild(emptyMessage)
    }

    // Clears field after adding ingredient
    ingredientInput.value = ""
    ingredientInput.placeholder = "Add Ingredient"    
}

// Remove ingredient -> Save again -> Render ingredients
const removeIngredient = (id) => {
    const ingredientIndex = ingredients.findIndex((ingredient) => {
        return ingredient.uniqueID === id
    })

    ingredients.splice(ingredientIndex, 1)
    saveIngredients()
    renderIngredients()
}

// Make ingredient
const makeIngredient = (ingredient) => {       
    const label = document.createElement("label")
    const itemsContainer = document.createElement("div")
    const checkbox = document.createElement("input")
    const listEL = document.createElement("span")
    const removeButton = document.createElement("button")    

    // Label
    label.classList.add("ingredient-item")

    // Ingredient Item Container
    itemsContainer.classList.add("ingredient-item__container")
    label.appendChild(itemsContainer)
    
    // Checkbox
    checkbox.setAttribute("type", "checkbox")
    itemsContainer.appendChild(checkbox)
    
    // Ingredient text
    listEL.textContent = ingredient.name
    listEL.classList.add("ingredient-name")
    itemsContainer.appendChild(listEL)
    
    // Removes selected ingredient
    removeButton.textContent = "Remove"
    removeButton.classList.add("remove-ingredient")
    removeButton.addEventListener("click", (e) => {
        removeIngredient(ingredient.uniqueID)
    })
    label.appendChild(removeButton)
    
    ingredientsList.appendChild(label)
}

// Save ingredients (Idk if I need ingredients array as argument)
const saveIngredients = () => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients))
}

// Get ingredients
const getSavedIngredients = () => {
    const ingredientsJSON = localStorage.getItem("ingredients")
    
    try {
        return ingredientsJSON ? JSON.parse(ingredientsJSON) : []
    } catch (e) {
        return []
    }
    
}

// Array now has localStorage ingredients
ingredients = getSavedIngredients()

// Saves the steps to the recipe
instructionsArea.addEventListener("input", (e) => {
    updateRecipe()
})

// Renders page with the recipe title, steps and ingredients
const renderEditPage = () => {    
    let foundRecipe = recipes.find((recipe) => {
        return recipe.id === location.hash.substring(1)
    })    
    recipeName.value = foundRecipe.title
    instructionsArea.value = foundRecipe.steps
    renderIngredients()    
}

// Renders page once
renderEditPage() 

// Deletes Recipe (dont forget to save them) BUT STILL NOT INGREDIENTS
deleteRecipe.addEventListener("click", (e) => {
    let recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === location.hash.substring(1)
    })    
        
    if (recipeIndex > -1 ) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()        
    }

    ingredients.forEach((ingredient) => {
        let toBeDeleted = ingredients.findIndex((ingredient) => {
            return ingredient.id === location.hash.substring(1)
        }) 

        console.log(toBeDeleted)
    
        if (toBeDeleted > -1) {
            ingredients.splice(toBeDeleted, 1)                      
        }
        saveIngredients()
    })

    location.assign("index.html")
})

const getIngredients = () => {
    return ingredients
}

export { getSavedIngredients }
 
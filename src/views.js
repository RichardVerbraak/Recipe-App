// import { getIngredients } from "./edit"

import { getRecipes } from "./recipes"
import { getFilters } from "./filters"

// IDK HOW TO CONNECT THE INGREDIENTS TO INDEX PAGE
// import { getSavedIngredients } from "./edit"

 
// Generates DOM elements for recipe
const generateRecipeDOM = (recipe) => {    
    const containerEl = document.createElement("a")
    const recipeText = document.createElement("p")
    const ingredientText = document.createElement("p")    
    
    containerEl.setAttribute("href", `edit.html#${recipe.id}`)
    containerEl.classList.add("list-item")

    if (recipe.title) {
        recipeText.textContent = recipe.title
    } else {
        recipeText.textContent = "Unnamed Recipe"
    }
    
    recipeText.classList.add("list-item__title")
    containerEl.appendChild(recipeText)

    ingredientText.textContent = "You have no ingredients"
    ingredientText.classList.add("list-item__subtitle")
    containerEl.appendChild(ingredientText)

    return containerEl
}

// Renders recipes to screen
const renderRecipes = () => {
    const recipeList = document.querySelector("#recipes")
    const recipes = getRecipes()
    const filter = getFilters()
    // const ingredients = getSavedIngredients()
    
    // It clears what was previously rendered
    recipeList.innerHTML = ""

    // Filter on searchtext
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filter.searchText.toLowerCase())
    })
    
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const newParagraph = generateRecipeDOM(recipe)
            recipeList.appendChild(newParagraph)
        })    
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.textContent = "Hmmm, no recipes!"
        emptyMessage.classList.add("empty-message")
        recipeList.append(emptyMessage)
    }
    
    // if (ingredients.length > 0) {
    //     updateRecipeStatus(ingredients, recipes)
    // }
    
    
}

// Look at recipe --> Find how many ingredients match the recipe ID --> If that length is > 1 (you have a few ingredients)
// const updateRecipeStatus = (ingredients, recipe) => {
//     let ingredientText = document.querySelector(".list-item__subtitle")
//     let matchedIngredients = ingredients.filter((ingredient) => {
//         return ingredient.id === recipe.id
//     })   
    
//     if (matchedIngredients.length > 0) {
//         ingredientText.textContent = "You have a few ingredients"
//     }    
// }




export { renderRecipes, generateRecipeDOM }
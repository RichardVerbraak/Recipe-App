import { renderRecipes } from "./views"
import { createRecipe } from "./recipes"
import { setFilters, getFilters } from "./filters"

// NOTES:
// I could have made a nested array inside of each recipe for the ingredients
// TODO: Remove ingredients on delete

// Render recipes first
renderRecipes()

// Search field
document.querySelector(".search-field").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    })
    let test = getFilters()
    // console.log(test)
    renderRecipes()
})

// Add recipe button
document.querySelector(".add-recipe").addEventListener("click", (e) => {
    // Add the input from the other page in as argument
    const id = createRecipe()
    location.assign(`edit.html#${id}`)
})
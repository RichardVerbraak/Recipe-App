import uuidv4 from "uuid/v4"
import { renderRecipes } from "./views";

let recipes = []

// Save recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
}

// Get recipes from localStorage
const getRecipes = () => {
    return recipes
}

// Create recipe
const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        id: id,
        title: "Unnamed Recipe",
        steps: ""
    })
    saveRecipes()
    renderRecipes()
    return id
}

const getSavedRecipes = () => {
    const recipeJSON = localStorage.getItem("recipes")

    try {
        return recipeJSON ? JSON.parse(recipeJSON) : []
    } catch(e) {
        return []
    }

}

recipes = getSavedRecipes()

export { createRecipe, getRecipes, saveRecipes, getSavedRecipes }

const mongoose = require('mongoose')
const { cuisineSchema, Cuisine } = require('./cuisine_type')
const directionsSchema = require('./directions')
const { ingredientSchema, recipeSchema } = require('./recipes')


const Directions = mongoose.model('Directions', directionsSchema)
const Recipes = mongoose.model('Recipes', recipeSchema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)
const Cuisines = mongoose.model(`Cuisines`, cuisineSchema)


module.exports = {
    Cuisines,
    Directions,
    Recipes,
    Ingredient,
}

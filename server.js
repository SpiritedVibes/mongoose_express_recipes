const express = require(`express`)
const cors = require(`cors`)
const PORT = process.env.PORT || 3001
const db = require(`./db`)
const cuisineController = require(`./controllers/cuisineController`)
const directionsController = require(`./controllers/directionsController`)
const ingredientsController = require(`./controllers/ingredientsController`)
const recipeController = require(`./controllers/recipeController`)

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is root!')
})

app.get('/cuisines', cuisineController.getAllCuisines)
app.get('/cuisines/:id', cuisineController.getCuisineById)
app.post('/cuisines', cuisineController.createCuisine)
app.put('/cuisines/:id', cuisineController.updateCuisine)
app.delete('/cuisines/:id', cuisineController.deleteCuisine)

app.get('/directions', directionsController.getAllDirections)
app.get('/directions/:id', directionsController.getDirectionsById)
app.post('/directions', directionsController.createDirection)
app.put('/directions:id', directionsController.updateDirection)
app.delete('/directions/:id', directionsController.deleteDirection)

app.get('/ingredients', ingredientsController.getAllIngredients)
app.get('/ingredients/:id', ingredientsController.getIngredientById)
app.post('/ingredients', ingredientsController.createIngredient)
app.put('/ingredients/:id', ingredientsController.updateIngredient)
app.delete('/ingredients/:id', ingredientsController.deleteIngredient)

app.get('/recipes', recipeController.getAllRecipes)
app.post('/recipes', recipeController.createRecipe)
app.get('/recipes/:id', recipeController.getRecipeById)
app.post('/recipes', recipeController.createRecipe)
app.put('/recipes/:id', recipeController.updateRecipe)
app.delete('/recipes/:id', recipeController.deleteRecipe)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
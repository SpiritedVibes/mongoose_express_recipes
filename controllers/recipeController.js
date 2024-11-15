const { Recipes } = require('../models')
const db = require('../db')

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({})
    res.json(recipes)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching recipes')
  }
}

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    console.log(`Fetching recipe with id: ${id}`)

    const recipe = await Recipes.findById(id)

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe with id ${req.params.id}:`, error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createRecipe = async (req, res) => {
  try {
      const recipe = await new Recipes(req.body)
      await recipe.save()
      return res.status(201).json({
          recipe,
      });
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}


const updateRecipe = async (req, res) => {
    try {
        let { id } = req.params;
        let recipe = await Recipes.findByIdAndUpdate(id, req.body, { new: true })
        if (recipe) {
            return res.status(200).json(recipe)
        }
        throw new Error("recipe not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteRecipe= async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Recipes.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("recipe has been deleted");
        }
        throw new Error("recipe not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getDirectionsById = ('/recipes/:id/directions', async (req, res) => {
  try {
    const { id } = req.params;

   
    const recipe = await Recipes.findById(id).populate('directions'); // Populate the directions

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    
    res.status(200).json(recipe.directions);
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports ={
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getDirectionsById
}
const {Ingredients} = require('../models')
const db = require('../db')

const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredients.find({})
    res.json(ingredients)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching ingredients')
  }
}

const getIngredientById = async (req, res) => {
  try {
    console.log(`gettting id`)
    console.log(req.params.id)
    const id = req.params.id;
    const ingredient = await Ingredients.findById(id);
    if (!ingredient) throw new Error('404 Ingredient not found');
    res.json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(404).send('Ingredient not found');
  }
}

const createIngredient = async (req, res) => {
  try {
      const ingredient = await new Ingredients(req.body)
      await ingredient.save()
      return res.status(201).json({
          ingredient,
      });
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}


const updateIngredient = async (req, res) => {
    try {
        let { id } = req.params;
        let ingredient = await Ingredients.findByIdAndUpdate(id, req.body, { new: true })
        if (ingredient) {
            return res.status(200).json(ingredient)
        }
        throw new Error("user not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteIngredient= async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Ingredients.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Ingredient has been deleted");
        }
        throw new Error("Ingredient not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


  module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient,
  }
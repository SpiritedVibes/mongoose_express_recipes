const { Cuisines } = require('../models')
const db = require('../db')

const getAllCuisines = async (req, res) => {
  try {
    const Cuisines = await Cuisines.find({})
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching Cuisines')
  }
}

const getCuisineById = async (req, res) => {
  try {
    console.log(`gettting id`)
    console.log(req.params.id)
    const id = req.params.id;
    const cuisine = await Cuisines.findById(id);
    if (!cuisine) throw new Error('404 Cuisine not found');
    res.json(cuisine);
  } catch (error) {
    console.error(error);
    res.status(404).send('Cuisine not found');
  }
}

const createCuisine = async (req, res) => {
  try {
      const cuisine = await new Cuisines(req.body)
      await cuisine.save()
      return res.status(201).json({
          cuisine,
      });
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}


const updateCuisine = async (req, res) => {
    try {
        let { id } = req.params;
        let cuisine = await Cuisine.findByIdAndUpdate(id, req.body, { new: true })
        if (cuisine) {
            return res.status(200).json(user)
        }
        throw new Error("cuisine not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteCuisine= async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cuisines.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("cuisine has been deleted");
        }
        throw new Error("cuisine not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
  getAllCuisines,
  getCuisineById,
  createCuisine,
  updateCuisine,
  deleteCuisine,
}

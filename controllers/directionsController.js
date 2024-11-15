const { Directions } = require('../models')
const db = require('../db')

const getAllDirections = async (req, res) => {
  try {
    const directions = await Directions.find({})
    res.json(directions)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching directions')
  }
}

const getDirectionsById = async (req, res) => {
  try {
    console.log(`gettting id`)
    console.log(req.params.id)
    const id = req.params.id;
    const directions = await Directions.findById(id);
    if (!direction) throw new Error('404 Directions not found');
    res.json(direction);
  } catch (error) {
    console.error(error);
    res.status(404).send('Direction not found');
  }
}

const createDirection = async (req, res) => {
  try {
      const direction = await new Directions(req.body)
      await direction.save()
      return res.status(201).json({
          direction,
      });
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}


const updateDirection = async (req, res) => {
    try {
        let { id } = req.params;
        let direction = await Direction.findByIdAndUpdate(id, req.body, { new: true })
        if (direction) {
            return res.status(200).json(direction)
        }
        throw new Error("Directions not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteDirection= async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Directions.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("directions has been deleted");
        }
        throw new Error("direction not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports ={
  getAllDirections,
  getDirectionsById,
  createDirection,
  updateDirection,
  deleteDirection,
}
const mongoose = require('mongoose')
const { Schema } = mongoose

const cuisineSchema = new Schema(
    {
        id: { type: Number, unique: true },
        name: { type: String, required: true },
        origin: { type: String, required: true },
        economy: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true }
)


const Cuisine = mongoose.model('Cuisine', cuisineSchema)


const createHealthyCuisine = async () => {
    const healthyCuisine = new Cuisine({
        name: "Healthy",
        origin: "Global",
        economy: "Affordable",
        description: "Focuses on nutrient-rich dishes."
    })

    await healthyCuisine.save()
    console.log('Healthy Cuisine saved:', healthyCuisine)
}

module.exports = { cuisineSchema, Cuisine, createHealthyCuisine }

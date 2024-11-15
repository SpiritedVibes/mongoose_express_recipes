const mongoose = require('mongoose')
const Schema = mongoose.Schema

const directionsSchema = new Schema(
    {
        recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },  // Reference to Recipe
        step_number: { type: Number, required: true },
        action: { type: String, required: true },
        oven_temperature: { value: Number, unit: String}
},
    { timestamps: true }
)

module.exports.directionsSchema = directionsSchema

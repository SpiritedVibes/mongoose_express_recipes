const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, enum: ['Oz', 'Tsp', 'Tbs', 'Gms', 'Ml', 'Lbs', 'Kg', 'Count', 'Cup'], required: true }
});

const recipeSchema = new Schema({
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    prep_time: { type: Number, required: true },
    cook_time: { type: Number, required: true },
    serving_size: { type: Number, required: true },
    ingredients: { type: [ingredientSchema], required: true },
    oven_temperature: { type: Number },
    value: { type: Number},
    unit: { type: String, enum: ['F', 'C'], required: true },
    directions: [{ type: Schema.Types.ObjectId, ref: 'Directions' }],
    cuisine_type: { type: Schema.Types.ObjectId, ref: 'Cuisine' }
});

const Recipe = mongoose.model('Recipe', recipeSchema); // Register the model here

module.exports = { Recipe, recipeSchema, ingredientSchema };

const mongoose = require('mongoose');
const { Recipes, Directions } = require('../models');
const db = require('../db');

const main = async () => {
    try {
        await db.connection; // Ensure the database is connected

        const oatFlourPancakes = new Recipes({
            name: "Oat Flour Pancakes",
            difficulty: "Medium",
            prep_time: 10, 
            cook_time: 15, 
            serving_size: 4, 
            ingredients: [
                { name: "Rolled oats", quantity: 2, unit: "Cup" },
                { name: "Baking powder", quantity: 2, unit: "Tsp" },
                { name: "Sea salt", quantity: 0.25, unit: "Tsp" },
                { name: "Granulated sugar", quantity: 1, unit: "Tbs" },
                { name: "Eggs", quantity: 2, unit: "Count" },
                { name: "Whole milk", quantity: 1, unit: "Cup" },
                { name: "Lemon juice", quantity: 2, unit: "Tsp" }
            ],
            oven_temperature: null, 
            value: 10, 
            unit: 'F', 
            cuisine_type: null
        });

        await oatFlourPancakes.save();

        const directions = await Directions.insertMany( [
            { step_number: 1, action: "Blend the rolled oats into a fine flour using a blender." },
            { step_number: 2, action: "In a large bowl, whisk together the oat flour, baking powder, sea salt, and sugar." },
            { step_number: 3, action: "In another bowl, whisk the eggs, milk, and lemon juice." },
            { step_number: 4, action: "Combine the wet ingredients with the dry ingredients and stir until just mixed." },
            { step_number: 5, action: "Heat a non-stick skillet over medium heat and pour 1/4 cup batter for each pancake." },
            { step_number: 6, action: "Cook until bubbles form on the surface, then flip and cook for another 1-2 minutes until golden." }
        ]);

        oatFlourPancakes.directions = directions.map(d => d._id);
        await oatFlourPancakes.save();
    
        console.log('Directions for Oat Flour Pancakes saved!');
      } catch (error) {
        console.error('Error in seeding database:', error);
      } finally {
        mongoose.connection.close(); // Ensure the connection is closed
      }
    };
const run = async () => {
    await main();
};

run();

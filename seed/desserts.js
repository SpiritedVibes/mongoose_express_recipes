const mongoose = require('mongoose');
const db = require('../db');
const { Recipes, Directions } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    try {
        const healthierNoBakeCookies = new Recipes({
            name: "Healthy No-Bake Cookies",
            difficulty: "Easy",
            prep_time: 15,
            cook_time: 0,
            serving_size: 12,
            ingredients: [
                { name: "Quick Oats", quantity: 1, unit: "Cup" },      
                { name: "Peanut Butter", quantity: 0.5, unit: "Cup" },   
                { name: "Honey", quantity: 0.25, unit: "Cup" },          
                { name: "Coconut Oil", quantity: 0.25, unit: "Cup" },    
                { name: "Unsweetened Coconut", quantity: 0.25, unit: "Cup" },  
                { name: "Unsweetened Cocoa powder", quantity: 2, unit: "Tbs" },  
                { name: "Pure Vanilla Extract", quantity: 1, unit: "Tsp" },    
                { name: "Sea Salt", quantity: 0.25, unit: "Tsp" }      
            ],
            oven_temperature: null, // No baking
            value: 10,
            unit: 'F',
            cuisine_type: null
        });

        const savedRecipe = await healthierNoBakeCookies.save();
        console.log('Healthier No-Bake Cookies saved!', savedRecipe);

        const directions = await Directions.insertMany([
            { recipe: savedRecipe._id, step_number: 1, action: "Line a cookie sheet with waxed paper, set aside." },
            { recipe: savedRecipe._id, step_number: 2, action: "Combine peanut butter, honey, salt, and coconut oil in a saucepan and heat, stirring continuously, until melted and well-combined." },
            { recipe: savedRecipe._id, step_number: 3, action: "Stir in vanilla and cocoa powder." },
            { recipe: savedRecipe._id, step_number: 4, action: "Add quick-cooking oats and mix well." },
            { recipe: savedRecipe._id, step_number: 5, action: "Add coconut and stir until completely combined." },
            { recipe: savedRecipe._id, step_number: 6, action: "Drop 1 TBS portions of mixture onto your prepared baking sheet. Continue until you’ve used all your cookie mixture." },
            { recipe: savedRecipe._id, step_number: 7, action: "Let cool in the refrigerator or freezer until hardened." },
            { recipe: savedRecipe._id, step_number: 8, action: "Serve cold or frozen!" },
            { recipe: savedRecipe._id, step_number: 9, action: "Store in an airtight container in the refrigerator!" }
        ]);

        healthierNoBakeCookies.directions = directions.map(d => d._id);
        await healthierNoBakeCookies.save();
    
        console.log('Directions for No Bake Cookies saved!');
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

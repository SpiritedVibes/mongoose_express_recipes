const mongoose = require('mongoose');
const db = require('../db');
const { Recipes, Directions } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    try {
       
        const braisedLambShanks = new Recipes({
            name: "Braised Lamb Shanks with Red Wine and Pomegranate Molasses",
            difficulty: "Hard",
            prep_time: 25, 
            cook_time: 120, // (in minutes)
            serving_size: 4, 
            ingredients: [ 
                { name: "Lamb shanks", quantity: 4, unit: "Count" },
                { name: "Garlic cloves, slivered", quantity: 2, unit: "Count" },
                { name: "Extra virgin olive oil", quantity: 3, unit: "Tbs" },
                { name: "Toasted cumin seeds", quantity: 0.5, unit: "Tsp" },
                { name: "Toasted coriander seeds", quantity: 0.75, unit: "Tsp" },
                { name: "Fresh thyme", quantity: 1, unit: "Tbs"},
                { name: "Shallots, slivered", quantity: 4, unit: "Count" },
                { name: "Dry red wine", quantity: 2, unit: "Cup" },
                { name: "Chicken stock", quantity: 1, unit: "Cup" },
                { name: "Cinnamon stick", quantity: 1, unit: "Count" },
                { name: "Salt", quantity: 1, unit: "Tsp", optional: true },
                { name: "Fresh cracked black pepper", quantity: 0.5, unit: "Tsp" },
                { name: "Red chili flakes", quantity: 0.5, unit: "Tsp"},
                { name: "Bay leaf", quantity: 1, unit: "Count" },
                { name: "Tomato paste", quantity: 1.5, unit: "Tbs" },
                { name: "Dates, finely chopped", quantity: 3, unit: "Count" },
                { name: "Pomegranate molasses", quantity: 1, unit: "Tbs" },
                { name: "Lemon zest", quantity: 1, unit: "Count" },
                { name: "Fresh mint, chopped", quantity: 1, unit: "Tbs"}
            ],
            oven_temperature: 325, 
            unit: 'F' 
        });

        const savedRecipe = await braisedLambShanks.save();
        console.log('Braised Lamb Shanks saved!', savedRecipe);

        // Directions for the Braised Lamb Shanks recipe
        const directions = await Directions.insertMany([
            { recipe: savedRecipe._id, step_number: 1, action: "Grind the cumin and coriander seeds with a mortar and pestle. Mix with thyme and black pepper, add half of the garlic, and toss well." },
            { recipe: savedRecipe._id, step_number: 2, action: "Make 2 incisions in each lamb shank along the bone and stuff with slivered garlic." },
            { recipe: savedRecipe._id, step_number: 3, action: "Heat olive oil in a frying pan and sear the shanks over medium-high heat for 4-6 minutes, turning until golden brown. Add the shallots between shanks to brown." },
            { recipe: savedRecipe._id, step_number: 4, action: "Remove lamb and set aside. Add the remaining garlic to the pan, sprinkle with flour, and stir to pick up fat." },
            { recipe: savedRecipe._id, step_number: 5, action: "Add some chicken stock and stir to create a creamy base. Then add tomato paste, red wine, remaining chicken stock, dates, pomegranate molasses, bay leaf, and cinnamon stick. Stir well." },
            { recipe: savedRecipe._id, step_number: 6, action: "Return the lamb shanks to the pan and sprinkle with remaining spices and lemon zest. Cover tightly." },
            { recipe: savedRecipe._id, step_number: 7, action: "Braise in the oven at 325°F for 30 minutes, then reduce heat to 300°F and cook for 1 hour. Baste the lamb with sauce and continue braising for another 30-60 minutes until tender." },
            { recipe: savedRecipe._id, step_number: 8, action: "Serve lamb shanks over couscous, orzo, or mashed potatoes. Optionally, sprinkle with chopped mint." }
        ]);

        braisedLambShanks.directions = directions.map(d => d._id);
        await braisedLambShanks.save();
    
        console.log('Directions for Lamb Shanks saved!');
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
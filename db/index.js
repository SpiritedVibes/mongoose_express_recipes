const mongoose = require(`mongoose`)

mongoose
    .connect(`mongodb+srv://SpiritedVibes:GothicRaven3@cluster0.pqgyz.mongodb.net/recipeDatabase?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=> {
        console.log(`connected to mongodb`)
    })
    .catch((e)=>{
    console.error(`error!`,e.mesaage)
})

mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db
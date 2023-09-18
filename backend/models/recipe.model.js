const mongoose=require("mongoose")

//extendedIngredients
const extendedIngredientsSchema = new mongoose.Schema({
    id: Number,
    image: String,
    name: String
})

const recipeSchemaDetail = new mongoose.Schema({
    aggregateLikes: {
        type: Number
    },
    cuisines: [String],
    diets: [String],
    dishTypes: [String],
    extendedIngredients: [extendedIngredientsSchema],
    healthScore: Number,
    id: Number,
    image: String,
    instructions: String,
    readyInMinutes: Number,
    summary: String,
    title: String
})

const recipeSchema=mongoose.Schema({
    recipe:[recipeSchemaDetail],
    userID:Number
},{
    
    versionKey:false
})

const RecipeModel=mongoose.model("recipe", recipeSchema)

module.exports={
    RecipeModel
}




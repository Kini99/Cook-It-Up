const mongoose=require("mongoose")

const recipeSchema=mongoose.Schema({
    
},{
    
    versionKey:false
})

const RecipeModel=mongoose.model("recipe", recipeSchema)

module.exports={
    RecipeModel
}
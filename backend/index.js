const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const cors=require("cors");
const { recipeRouter } = require("./routes/recipe.route");
require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/recipe",recipeRouter);

app.get("/savedrecipe", async(req, res) => {
    const { username } = req.query;
    console.log(username,"before try block")
    try {
      let recipeData = await RecipeModel.find({ username }).exec();
      console.log(recipeData,"in server")
      if (!recipeData || recipeData.length === 0) {
        return res.status(404).json({ message: "No saved recipes found for this user." });
      }
      console.log(recipeData)
     return res.status(200).json(recipeData);
    } catch (error) {
      console.error("error over here");
      res.status(500).json({ error: "Error in saved recipe" });
    }
  })

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Server is running and db is connected")
    }catch(err){
        console.log(err)
    }
})
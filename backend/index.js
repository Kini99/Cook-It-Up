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

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Server is running and db is connected")
    }catch(err){
        console.log(err)
    }
})
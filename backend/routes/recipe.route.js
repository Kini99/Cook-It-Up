const express=require("express");
const { RecipeModel } = require("../models/recipe.model");
const { auth } = require("../middleware/auth.middleware");
require('dotenv').config(); 
const axios=require("axios");

const recipeRouter= express.Router();

recipeRouter.get("/random",async(req,res)=>{
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.APIKEY}&number=8`);
        const recipeData = response.data.recipes; 
        res.status(200).json(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
      }
})

recipeRouter.get("/quick",async(req,res)=>{
  try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=819f68cc93284522862246b46f14c18b&maxReadyTime=20&number=8`);
      const recipeData = response.data.results; 
      res.status(200).json(recipeData);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Error fetching recipe" });
    }
})

recipeRouter.get("/:id",async(req,res)=>{
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.APIKEY}&number=1`);
        const recipeData = response.data.recipes; 
        res.status(200).json(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
      }
})

recipeRouter.get("/similar",async(req,res)=>{
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.APIKEY}&number=1`);
        const recipeData = response.data.recipes; 
        res.status(200).json(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
      }
})

recipeRouter.post("/save", auth, async (req, res) => {
    try {
        const recipe = new RecipeModel(req.body);
        await recipe.save();
        res.status(200).json({ msg: "New Recipe Saved", recipe: req.body })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

recipeRouter.get("/savedrecipe", auth, async(req,res)=>{
    try {
        let recipeData = await RecipeModel.find(); 
        res.status(200).json(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
      }
})

module.exports = { recipeRouter };

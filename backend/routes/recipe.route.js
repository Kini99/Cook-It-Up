const express = require("express");
const { auth } = require("../middleware/auth.middleware");
require('dotenv').config();
const axios = require("axios");
const { RecipeModel } = require("../models/recipe.model");

const recipeRouter = express.Router();

recipeRouter.get("/random", async (req, res) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.apiKey}&number=8`);
    const recipeData = response.data.recipes;
    res.status(200).json(recipeData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
})

recipeRouter.get("/quick", async (req, res) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&maxReadyTime=20&number=8`);
    const recipeData = response.data.results;
    res.status(200).json(recipeData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
})

recipeRouter.get("/search", async (req, res) => {
  const { query } = req.query;
  // const offset=(page-1)*20;
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${query}&number=20`);
    const recipeData = response.data.results;
    res.status(200).json(recipeData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
})


recipeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.apiKey}`);
    const recipeData = response.data;
    res.status(200).json(recipeData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
})

recipeRouter.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.apiKey}&number=8`);
    const recipeData = response.data;
    res.status(200).json(recipeData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
})

recipeRouter.post("/save", async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    await recipe.save();
    res.status(200).json({ msg: "New Recipe Saved", recipe: req.body })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})



module.exports = { recipeRouter };

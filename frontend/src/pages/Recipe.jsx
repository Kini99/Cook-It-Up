import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeDetails } from '../redux/RecipeReducer/Action';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import time from "../assets/time.png";
import likes from "../assets/likes.png";
import score from "../assets/score.png";
import "../styles/Recipe.css";
import { Button } from '@chakra-ui/react';
import axios from "axios";
import RecipeCarousel from '../components/RecipeCarousal';
import { getSavedRecipe, saveRecipe } from '../redux/SavedReducer/Action';

const Recipe = () => {

  const { recipe } = useSelector((store) => store.RecipeReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [similarRecipes, setSimilarRecipes] = useState();
  const [saved, setSaved] = useState(false);

  const { isAuth, username } = useSelector((store) => { return store.AuthReducer }, shallowEqual);
  const { savedRecipe } = useSelector((store) => {
    return store.SavedReducer
  }, shallowEqual);
 const user=localStorage.getItem("user");

  useEffect(() => {
    dispatch(getRecipeDetails(id));
    dispatch(getSavedRecipe(username));
    setSaved(false);
  }, [id, username]);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}recipe/similar/${id}`)
      .then((res) => res.data)
      .then((data) => setSimilarRecipes(data))
      .catch((error) => console.log(error));
      window.scrollTo(0, 0);
  }, [recipe])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSave = async() => {
    if (!user) {
      alert("Kindly Login First!");
      navigate("/login");
      return;
    }

    const recipeDetails = {
      recipe: recipe.aggregateLikes,
      cuisines: recipe.cuisines,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
      extendedIngredients: recipe.extendedIngredients,
      healthScore: recipe.healthScore,
      id: recipe.id,
      image: recipe.image,
      instructions: recipe.instructions,
      readyInMinutes: recipe.readyInMinutes,
      summary: recipe.summary,
      title: recipe.title
    }

    const savedRecipeData = {
      recipe: recipeDetails,
      userId: username
    };
    console.log("dispatch start")
    await dispatch(saveRecipe(savedRecipeData));
   
  }

  useEffect(()=>{
    if (savedRecipe) {
      console.log(savedRecipe)
      const alreadySaved = savedRecipe.filter((el) =>recipe.id == el.recipe.id
       );
      console.log(alreadySaved,"already saved")
      if (alreadySaved.length > 0) {
        setSaved(true);
      }
    }
  },[savedRecipe,recipe])

console.log(saved,"saved")
  return (
    <>
      <Navbar />
      {recipe && (<div className='recipe-container'>
        <div className='heading'>
          <h1>{recipe.title?.charAt(0).toUpperCase() + recipe.title?.slice(1)}</h1>
          {saved ? <Button
            h={{ base: 'auto', md: '85%' }}
            p={"2"}
            size='lg'
            bg={"orange.400"}
            _hover={{ bg: "orange.300" }}
            className='button'
          >
            Saved!
          </Button> : <Button
            h={{ base: 'auto', md: '85%' }}
            p={"2"} 
            size='lg'
            bg={"orange.400"}
            _hover={{ bg: "orange.300" }}
            onClick={handleSave}
            className='button'
          >
            Save Recipe
          </Button>}
        </div>
        <div className='recipe-details'>
          <div className='image-container'>
            <img src={recipe.image} alt="image" />
            <div className="flex-div">
              <div>
                <img src={likes} alt="icon" />
                <p className="left-p">{recipe.aggregateLikes} Likes</p>
              </div>
              <div>
                <img src={time} alt="icon" />
                <p>Ready in {recipe.readyInMinutes} Minutes</p>
              </div>
              <div>
                <img src={score} alt="icon" />
                <p>Health Score {recipe.healthScore}</p>
              </div>
            </div>
          </div>
          <div>
            <h3>Dish Type:</h3>
            <p>{recipe.dishTypes?.map(capitalizeFirstLetter).join(', ')}</p>
            <br />
            <h3>Diets:</h3>
            <p>{recipe.diets?.map(capitalizeFirstLetter).join(', ')}</p>
            <br />
            <h3>Instructions:</h3>
            <p>{recipe.instructions?.charAt(0).toUpperCase() + recipe.instructions?.slice(1)}</p>
          </div>
        </div>
        <div>
          <h3>Ingredients:</h3>
          <div className='ingredients-container'>
            {recipe.extendedIngredients?.map((item) =>
              <div key={item.id} className='ingredient'>
                <img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt="" />
                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
      <div className='similar-recipe'>
        <h1>Similar Recipes</h1>
        <RecipeCarousel data={similarRecipes} />
      </div>
      <Footer />
    </>
  )
}

export default Recipe
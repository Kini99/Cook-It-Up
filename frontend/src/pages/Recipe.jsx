import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

const Recipe = () => {

  const { recipe } = useSelector((store) => store.RecipeReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [similarRecipes,setSimilarRecipes]=useState();

  const { isAuth } = useSelector((store) => store.AuthReducer);

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER}recipe/similar/${id}`)
     .then((res) => res.data)
     .then((data) =>console.log("data",data))
     .catch((error) => console.log(error));
   },[])

   console.log(similarRecipes)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSave = () => {
    if (!isAuth) alert("Kindly Login First!");

  }

  return (
    <>
      <Navbar />
      {recipe && (<div className='recipe-container'>
        <div className='heading'>
          <h1>{recipe.title}</h1>
          <Button
            h={{ base: 'auto', md: '85%' }}
            p={"2"}
            size='lg'
            bg={"orange.400"}
            _hover={{ bg: "orange.300" }}
            onClick={handleSave}
            className='button'
          >
            Save Recipe
          </Button>
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
            <p>{recipe.instructions}</p>
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
      <RecipeCarousel data={similarRecipes}/>
      </div>
      <Footer />
    </>
  )
}

export default Recipe
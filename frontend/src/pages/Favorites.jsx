import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../styles/RecipeCarousal.css";
import "../styles/SearchResults.css";
import { getSavedRecipe } from '../redux/SavedReducer/Action';

const Favorites = () => {

const dispatch=useDispatch();

  const { savedRecipe } = useSelector((store) => {
    return store.SavedReducer
}, shallowEqual);

const { isAuth,username } = useSelector((store) => store.AuthReducer);

useEffect(() => {
  if (isAuth) {
    dispatch(getSavedRecipe(username)); 
  }
}, [dispatch, isAuth, username]);

console.log("fav", savedRecipe, username)

  return (
    <>
    <Navbar />
    { savedRecipe.length>0 ? <div className='results-container'>
            {savedRecipe.map((item) =>
            <div key={item.recipe.id} className="div">
                 <Link to={`/recipe/${item.recipe.id}`} className='result-link'>
                <img src={item.recipe.image} alt={item.recipe.title} className="image" />
                <div className="details">
                    <h2>{item.recipe.title}</h2>
                </div>
                </Link>
            </div>
        )}
        </div>:<h1 style={{height:"65vh", fontWeight:"bold", textAlign:"center", fontSize:"50px"}}>No Recipes Saved Yet!</h1>}
    <Footer />
    </>
  )
}

export default Favorites
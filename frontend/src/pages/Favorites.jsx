import React from 'react';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../styles/RecipeCarousal.css";
import "../styles/SearchResults.css";

const Favorites = () => {

  const { savedRecipe } = useSelector((store) => {
    return store.SavedReducer
}, shallowEqual);

  return (
    <>
    <Navbar />
    {savedRecipe.isArray && savedRecipe && <div className='results-container'>
            {savedRecipe.map((item) =>
            <div key={item.id} className="div">
                 <Link to={`/recipe/${item.id}`} className='result-link'>
                <img src={item.image} alt={item.title} className="image" />
                <div className="details">
                    <h2>{item.title}</h2>
                </div>
                </Link>
            </div>
        )}
        </div>}
    <Footer />
    </>
  )
}

export default Favorites
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import "../styles/RecipeCarousal.css";
import "../styles/SearchResults.css";
import Navbar from '../components/Navbar';

const SearchResults = () => {

    const { results } = useSelector((store) => {
        return store.SearchReducer
    }, shallowEqual);

    return (
        <>
        <Navbar/>
        <div className='results-container'>
            {results && results.map((item) =>
            <div key={item.id} className="div">
                <img src={item.image} alt={item.title} className="image" />
                <div className="details">
                    <h2>{item.title}</h2>
                </div>
            </div>
        )}
        </div>
        </>
    )
}

export default SearchResults
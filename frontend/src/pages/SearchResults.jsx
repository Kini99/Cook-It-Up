import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import "../styles/RecipeCarousal.css";
import "../styles/SearchResults.css";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const SearchResults = () => {

    // const [currentPage, setCurrentPage] = useState(1);

    const { results } = useSelector((store) => {
        return store.SearchReducer
    }, shallowEqual);

    // const totalPages = Math.ceil(results.length / 10);

    // const startIndex = (currentPage - 1) * 10;
    // const endIndex = startIndex + 10;

    // const currentPageData = results.slice(startIndex, endIndex);

    // const handlePreviousPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    // const handleNextPage = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    return (
        <>
        <Navbar/>
        <div className='results-container'>
            {results.map((item) =>
            <div key={item.id} className="div">
                 <Link to={`/recipe/${item.id}`} className='result-link'>
                <img src={item.image} alt={item.title} className="image" />
                <div className="details">
                    <h2>{item.title}</h2>
                </div>
                </Link>
            </div>
        )}
        </div>
        {/* <div className="pagination-container">
                <div className="pagination-div">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div> */}
            <Footer/>
        </>
    )
}

export default SearchResults
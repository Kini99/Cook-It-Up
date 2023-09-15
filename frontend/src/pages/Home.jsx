import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import "../styles/Home.css";
import SearchBar from '../components/SearchBar';
import RecipeCarousel from '../components/RecipeCarousal';
import axios from "axios";
import Footer from '../components/Footer';

const Home = () => {

const [randomRecipes,setrandomRecipes]=useState();
const [quickRecipes,setQuickRecipes]=useState();

useEffect(()=>{
 axios.get(`http://localhost:8080/recipe/random`)
  .then((res) => res.data)
  .then((data) =>setrandomRecipes(data))
  .catch((error) => console.log(error));
  axios.get(`http://localhost:8080/recipe/quick`)
  .then((res) =>res.data)
  .then((data) =>setQuickRecipes(data))
  .catch((error) => console.log(error));
},[])

  return (
    <div className='container'>
      <img src={logo} alt="" className='logo' />
      <SearchBar className="input"/>
      <h1>Top Picks</h1>
      <RecipeCarousel data={randomRecipes}/>
      <h1>Quick Bites</h1>
      <RecipeCarousel data={quickRecipes}/>
      <Footer/>
    </div>
  )
}

export default Home
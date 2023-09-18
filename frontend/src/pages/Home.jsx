import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import "../styles/Home.css";
import SearchBar from '../components/SearchBar';
import RecipeCarousel from '../components/RecipeCarousal';
import axios from "axios";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {

const [randomRecipes,setrandomRecipes]=useState();
const [quickRecipes,setQuickRecipes]=useState();

useEffect(()=>{
 axios.get(`${process.env.REACT_APP_SERVER}recipe/random`)
  .then((res) => res.data)
  .then((data) =>setrandomRecipes(data))
  .catch((error) => console.log(error));
  axios.get(`${process.env.REACT_APP_SERVER}recipe/quick`)
  .then((res) =>res.data)
  .then((data) =>setQuickRecipes(data))
  .catch((error) => console.log(error));
},[])

  return (
    <>
    <Navbar />
    <div className='container'>
      <img src={logo} alt="" className='logo' />
      <SearchBar className="input"/>
      <h1>Top Picks</h1>
      <RecipeCarousel data={randomRecipes}/>
      <h1>Quick Bites</h1>
      <RecipeCarousel data={quickRecipes}/>
      <Footer/>
    </div>
    </>
  )
}

export default Home
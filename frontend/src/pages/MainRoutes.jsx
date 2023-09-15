import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Recipe from './Recipe';
import Favorites from './Favorites';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/recipe/:id" element={<Recipe />}/>
        <Route path="/favorites" element={<Favorites />}/>
    </Routes>
  )
}

export default MainRoutes
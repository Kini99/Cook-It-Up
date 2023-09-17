import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Recipe from './Recipe';
import Favorites from './Favorites';
import SearchResults from './SearchResults';
import { PrivateRoute } from '../components/PrivateRoute';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/recipe/:id" element={<Recipe />}/>
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>}/>
    </Routes>
  )
}

export default MainRoutes
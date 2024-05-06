import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import MealFront from "../pages/mealFront/MealFront";
import Home from "../pages/home/Home";
import Posts from "../pages/posts/Posts";
import Search from "../pages/search/Search";


function routes() {
  return (
    <Routes>
    
  {/* User Route */}
      {/* User Route */}
      <Route path="/user" element={<Layout />}>
        <Route path="/user/home" element={<Home />} />
       
        <Route path="/user/posts" element={<Posts />} />
       
        <Route path="/user/search" element={<Search />} />
        <Route path="/user/mealFront" element={<MealFront />} />
      </Route>

     
    </Routes>
  );
}

export default routes;

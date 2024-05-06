import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";

import Posts from "../pages/posts/Posts";
import Search from "../pages/search/Search";



function routes() {
  return (
    <Routes>
   
      {/* User Route */}
      <Route path="/user" element={<Layout />}>
        <Route path="/user/posts" element={<Posts />} />
        <Route path="/user/search" element={<Search />} />
      </Route>

    </Routes>
  );
}

export default routes;

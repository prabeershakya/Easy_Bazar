import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     
    </Router>
  );
};

export default App;
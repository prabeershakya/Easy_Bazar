import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"
import Home from "./pages/Home";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right"
       reverseOrder={false}
       transitionDuration={200}
       toastOptions={{
         className: 'custom-toast',
         style: {
           Animation: ' 0.5s ease-in-out',
         },
       }} />

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
     <Footer />
      
    </Router>
  );
};

export default App;
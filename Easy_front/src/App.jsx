import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import About from "./pages/About";
import Admin from "./pages/Admin";
import SellerDashboard from "./pages/SellerDashboard";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main content grows to fill space */}
        <main className="flex-grow">
          <Toaster
            position="top-right"
            reverseOrder={false}
            transitionDuration={200}
            toastOptions={{
              className: "custom-toast",
              style: {
                Animation: "0.5s ease-in-out",
              },
            }}
          />

          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/sellerDashboard" element={<SellerDashboard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

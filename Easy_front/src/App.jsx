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
import AddProduct from "./pages/addProduct";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductPage";
import SellerProfile from "./pages/SellerProfile";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Toaster
            position="top-right"
            reverseOrder={false}
            transitionDuration={200}
            toastOptions={{
              className: "custom-toast",
              style: {
                animation: "0.5s ease-in-out",
              },
            }}
          />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<About />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addProduct"
              element={
                <ProtectedRoute role={["seller", "admin"]}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute role={["user", "admin", "seller"]}>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role={["user", "admin", "seller"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/Home" element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/user/:id" element={<SellerProfile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

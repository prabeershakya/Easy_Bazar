import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getFeaturedProductsApi } from "../api/api";

const HomePage = () => {
  const navigate = useNavigate();

  // Categories (matching Product.jsx for consistency)
  const categories = [
    { name: "electronics", label: "Electronics", image: "📱" },
    { name: "clothing", label: "Clothing", image: "👕" },
    { name: "books", label: "Books", image: "📚" },
    { name: "home", label: "Home", image: "🏠" },
    { name: "sports", label: "Sports", image: "⚽" },
    { name: "beauty", label: "Beauty", image: "💄" }
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchFeaturedProducts = async () => {
      try {
        const res = await getFeaturedProductsApi();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };


    fetchFeaturedProducts();
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Navigate to the products page with the selected category
    navigate('/product', { 
      state: { category: categoryName }
    });
  };


  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="pt-16 px-4">
      <div className="bg-orange-500 text-white text-center py-16 rounded-lg mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Easy Bazar</h1>
        <p className="text-xl mb-6">Your one-stop shop for everything!</p>
        <button 
          onClick={() => navigate('/product')}
          className="bg-white text-orange-500 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Shopping
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="text-4xl mb-2">{category.image}</div>
              <p className="font-medium">{category.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No featured products found.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md"
              >
                <div className="text-center mb-4">
                  <div
                    className="text-6xl mb-2">
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  
                  </div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>

                <div className="text-center mb-4">
                  <p className="text-xl font-bold text-orange-600">
                    Rs. {product.price}
                  </p>
                </div>

                <button
                  onClick={() => handleViewProduct(product.id)}
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 flex items-center justify-center"
                >
                  View Product
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Easy Bazar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders above Rs. 2000</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💯</div>
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">100% genuine and quality products</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure payment methods</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

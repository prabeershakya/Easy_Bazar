import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const HomePage = () => {
  // Simple categories
  const categories = [
    { name: "Electronics", image: "📱" },
    { name: "Clothing", image: "👕" },
    { name: "Books", image: "📚" },
    { name: "Home", image: "🏠" },
    { name: "Sports", image: "⚽" },
    { name: "Beauty", image: "💄" }
  ];

  // Sample products
  const products = [
    {
      id: 1,
      name: "Smartphone",
      price: "Rs. 25,000",
      oldPrice: "Rs. 30,000",
      image: "📱",
      rating: 4
    },
    {
      id: 2,
      name: "Laptop",
      price: "Rs. 65,000",
      oldPrice: "Rs. 75,000",
      image: "💻",
      rating: 5
    },
    {
      id: 3,
      name: "T-Shirt",
      price: "Rs. 1,500",
      oldPrice: "Rs. 2,000",
      image: "👕",
      rating: 4
    },
    {
      id: 4,
      name: "Headphones",
      price: "Rs. 3,500",
      oldPrice: "Rs. 5,000",
      image: "🎧",
      rating: 4
    },
    {
      id: 5,
      name: "Watch",
      price: "Rs. 8,000",
      oldPrice: "Rs. 10,000",
      image: "⌚",
      rating: 5
    },
    {
      id: 6,
      name: "Shoes",
      price: "Rs. 4,500",
      oldPrice: "Rs. 6,000",
      image: "👟",
      rating: 4
    }
  ];

  return (
    <div className="pt-16 px-4">
      
      <div className="bg-orange-500 text-white text-center py-16 rounded-lg mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Easy Bazar</h1>
        <p className="text-xl mb-6">Your one-stop shop for everything!</p>
        <button className="bg-white text-orange-500 px-6 py-3 rounded font-semibold hover:bg-gray-100">
          Start Shopping
        </button>
      </div>

     
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-lg shadow hover:shadow-md">
              <div className="text-4xl mb-2">{category.image}</div>
              <p className="font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

     
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{product.image}</div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
              </div>
              
              <div className="flex items-center justify-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <div className="text-center mb-4">
                <p className="text-xl font-bold text-orange-600">{product.price}</p>
                <p className="text-gray-500 line-through">{product.oldPrice}</p>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 flex items-center justify-center">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
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
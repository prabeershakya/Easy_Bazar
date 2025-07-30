import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Replace with your actual API call
  const fetchWishlistApi = async () => {
    // Mock data - replace with your API
    return {
      data: [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation",
          price: 15000,
          image: "headphones.jpg",
          stock: 25
        },
        {
          id: 2,
          name: "Organic Cotton T-Shirt",
          description: "Comfortable and sustainable organic cotton t-shirt",
          price: 2500,
          image: "tshirt.jpg",
          stock: 50
        }
      ]
    };
  };

  const removeFromWishlistApi = async (productId) => {
    // Replace with your actual API call
    return { success: true };
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetchWishlistApi();
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast.error('Failed to load wishlist.');
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId, productName) => {
    try {
      await removeFromWishlistApi(productId);
      setWishlistItems(wishlistItems.filter(item => item.id !== productId));
      toast.success(`${productName} removed from wishlist!`);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-lg opacity-90">Your saved products</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {wishlistItems.length} items in wishlist
          </h2>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={
                    item.image
                      ? `http://localhost:3000/uploads/${item.image}`
                      : '/no-image.png'
                  }
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/no-image.png';
                  }}
                />
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + '...'
                      : item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-orange-600">
                      Rs. {item.price}
                    </span>
                    {item.stock && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Stock: {item.stock}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
                    >
                      View Product
                    </Link>
                    
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-600 py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4">Start adding products you love</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
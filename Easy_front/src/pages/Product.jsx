import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { getUserProfileApi } from '../api/api';
import { searchProductsApi } from '../api/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Product = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getUserProfileApi();
      setUser(res.data);
      // console.log('User profile fetched:', res.data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  fetchUser();
}, []);
  const categories = [
    { value: '', label: '🏪 All Categories' },
    { value: 'electronics', label: '📱 Electronics' },
    { value: 'clothing', label: '👕 Clothing' },
    { value: 'books', label: '📚 Books' },
    { value: 'home', label: '🏠 Home' },
    { value: 'sports', label: '⚽ Sports' },
    { value: 'beauty', label: '💄 Beauty' }
  ];


  const canAddProduct = user && (user.role === 'seller' || user.role === 'admin');

  const handleSearch = async (newQuery = query) => {
    try {
      if (newQuery !== query) setQuery(newQuery);
      const response = await searchProductsApi(newQuery, category);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Find Your Perfect Product
            </h1>
            <p className="text-lg opacity-90">
              Browse through our collection of amazing products
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 text-lg rounded-lg border-2 border-gray-200 focus:border-orange-400 bg-white text-gray-800 min-w-[200px]"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSearch()}
                className="px-8 py-3 text-lg rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Results Info and Add Product Button */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">
              {results.length} products found
            </span>
            {category && (
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                {categories.find(c => c.value === category)?.label}
              </span>
            )}
          </div>
          
          {/* Add Product Button - Only visible to sellers and admins */}
          {canAddProduct && (
            <Link
              to="/addProduct"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <span className="text-lg">➕</span>
              Add Product
            </Link>
          )}
        </div>

        {/* Products Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={
                      product.image
                        ? `http://localhost:3000/uploads/${product.image}`
                        : '/no-image.png'
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/no-image.png';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description.length > 80
                      ? product.description.slice(0, 80) + '...'
                      : product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-orange-600">
                      Rs. {product.price}
                    </span>
                    {product.stock && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Stock: {product.stock}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try different search terms or browse all categories</p>
            <button
              onClick={() => {
                setQuery('');
                setCategory('');
                handleSearch('');
              }}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Product;
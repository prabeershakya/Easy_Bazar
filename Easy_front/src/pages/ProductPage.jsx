import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByIdApi } from '../api/api';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByIdApi(id);
        
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        toast.error('Failed to load product.');
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleBuyClick = () => {
    // Add your buy logic here
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleWishlistClick = () => {
    // Add your wishlist logic here
    toast.success(`Added ${product.name} to wishlist!`);
  };

  const handleViewProfile = () => {
    // Add your view profile logic here
    // You might want to navigate to seller profile page
    toast.success(`Viewing ${product.seller.username}'s profile!`);
  };
  
  if (!product) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  // console.log('Product data:', product);
  return (
    <div className="max-w-5xl mx-auto mt-20 p-6">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <img
          src={`http://localhost:3000/uploads/${product.image}`}     
          alt={product.name}
          className="w-full rounded-lg shadow-md object-cover max-h-[500px]"
        />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <p className="text-orange-600 text-2xl font-semibold">Rs. {product.price}</p>
            
          <p><strong>Stock:</strong> {product.stock || 'N/A'}</p>
            
          <p className="text-gray-500">Category: {product.category || 'N/A'}</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleBuyClick}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlistClick}
              className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold py-3 px-6 rounded-lg border-2 border-orange-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              Add to Wishlist
            </button>
          </div>
            
          {product.seller && (
            <div className="mt-10 p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Seller Information</h2>
              <p><strong>Name:</strong> {product.seller.username || 'N/A'}</p>
              <p><strong>Email:</strong> {product.seller.email || 'N/A'}</p>
              <button
                onClick={handleViewProfile}
                className="mt-3 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out hover:shadow-md"
              >
                View Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
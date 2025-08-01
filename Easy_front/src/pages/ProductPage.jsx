import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByIdApi } from '../api/api';
import { addToWishlist } from '../api/api'; 
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByIdApi(id);
        // console.log('Product fetched:', res.data);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        toast.error('Failed to load product.');
      }
    };
    
    fetchProduct();
  }, [id]);

  
  const handleAddToWishlist = async () => {
  const token = localStorage.getItem('token');
  try {
    const data = await addToWishlist(id, token);
    
    if (data.success) {
      setInWishlist(true);
      toast.success(`Added ${product.name} to wishlist!`);
    } else {
      toast.error(data.message || 'Failed to add.');
    }
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    setInWishlist(false);
    toast.error(err.error || 'Something went wrong');
  }
};
    
  
const handleViewProfile = () => {
  if (product?.seller?.id) {
    navigate(`/user/${product.seller.id}`);
  } else {
    toast.error("Seller information not available");
  }
};


  
  if (!product) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

const handleBuyClick = () => {
  if (!product) {
    toast.error("Product not loaded yet");
    return;
  }

  const config = {
    publicKey: "test_public_key_dc74a350a50c4ed1a4b2097c21a2b3cd",
    productIdentity: product.id.toString(), 
    productName: product.name,
    productUrl: window.location.href,
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING"],
    eventHandler: {
      onSuccess(payload) {
        // console.log("Payment Success:", payload);
        toast.success("Payment Successful!");
      },
      onError(error) {
        // console.log("Payment Error:", error);
        toast.error("Payment failed. Please try again.");
      },
      onClose() {
        //  console.log("Payment widget closed");
      },
    },
  };
  const checkout = new window.KhaltiCheckout(config);
  checkout.show({ amount: product.price * 100 });
};

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
              onClick={handleAddToWishlist}
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
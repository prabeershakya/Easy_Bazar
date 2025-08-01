import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  

  useEffect(() => {
    fetchSellerProfile();
  }, [id]);

  const fetchSellerProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${id}`, {  
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        } 
      });
      
      setSeller(response.data);
    } catch (error) {
      console.error('Error fetching seller:', error);
    } 
  };


  if (!seller) {
    return <div className="text-center mt-20 text-red-600">Seller not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
       
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          ← Back
        </button>

      
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
           
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6">
              {seller.username?.charAt(0).toUpperCase() || 'S'}
            </div>

            {/* Seller Details */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {seller.username || 'Unknown Seller'}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {seller.email || 'No email provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

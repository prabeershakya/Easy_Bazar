import React, { useEffect, useState } from 'react';
import { getSellerProductsApi } from '../api/api';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // console.log('Fetching seller products...');
        const res = await getSellerProductsApi();
        // console.log('API Response:', res);
        if (res && res.data) {
          // console.log('Products data:', res.data);
          setProducts(res.data);
        } else {
          console.error('No data in response:', res);
        }
      } catch (err) {
        console.error('Error fetching seller products:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={`http://localhost:3000/uploads/${product.image.replace(/\\/g, '/')}`}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">Price: Rs. {product.price}</p>
              <p className="text-gray-600">Stock: {product.stock}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

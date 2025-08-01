import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUserProfileApi } from '../api/api';
import { createProductApi } from '../api/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });

  const categories = [
    { value: 'electronics', label: '📱 Electronics' },
    { value: 'clothing', label: '👕 Clothing' },
    { value: 'books', label: '📚 Books' },
    { value: 'home', label: '🏠 Home' },
    { value: 'sports', label: '⚽ Sports' },
    { value: 'beauty', label: '💄 Beauty' }
  ];

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getUserProfileApi();
      setUser(res.data);
      // console.log('User profile fetched:', res.data);
      
     
      if (!['admin', 'seller'].includes(res.data.role)) {
        navigate('/Home');
        toast.error('You do not have access to this page');
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      toast.error('Failed to load user profile');
      
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  fetchUser();
}, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push('Product name is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.price || parseFloat(formData.price) <= 0) errors.push('Valid price is required');
    if (!formData.category) errors.push('Category is required');
    if (!formData.stock || parseInt(formData.stock) < 0) errors.push('Valid stock quantity is required');

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', parseFloat(formData.price));
      submitData.append('category', formData.category);
      submitData.append('stock', parseInt(formData.stock));
      if (formData.image) {
        submitData.append('image', formData.image);
      }

try {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');


  const response = await createProductApi(submitData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  toast.success('Product added successfully!');



} catch (error) {
  console.error('Error adding product:', error);

  toast.error(error.response?.data?.message || error.message || 'Failed to add product');
}

      toast.success('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null
      });

      navigate('/product');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product');
    }
  };

  const handleCancel = () => {
    navigate('/product');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h1>
              <p className="text-gray-600">Fill in the details to add a new product to your store</p>
            </div>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              ← Back to Products
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 resize-vertical"
                  placeholder="Describe your product..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                  <div className="text-4xl mb-4">📷</div>
                  <p className="text-gray-600 mb-4">Click to upload product image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg cursor-pointer font-medium transition-colors"
                  >
                    Choose Image
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported: JPEG, PNG, WebP (Max: 5MB)
                  </p>
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.image.name} selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

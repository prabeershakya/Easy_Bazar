import axios from "axios";

const ApiFormData = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const Api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const ApiLogin = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const createUserApi = (data) => Api.post('/user/register', data)
export const loginUserApi = (data) => Api.post('/user/login', data);

export const getUserById = (id) => {
  return Api.get(`/user/${id}`);
};

export const searchProductsApi = (query, category) => 
  Api.get('/product/search', { 
    params: { 
      q: query, 
      ...(category && { category }) 
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const createProductApi = (data) => Api.post('/product/create', data, {
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
});


export const getFeaturedProductsApi = () => {
  return Api.get('/product/list?featured=true', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export const getUserProfileApi = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  return Api.get('/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductByIdApi = (id) => Api.get(`/product/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const deleteProductApi = (id) => Api.delete(`/product/delete/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSellerProductsApi = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  return Api.get('/product/sellerProd', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const switchToSellerApi = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  return Api.put(
    '/user/updateToSeller',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


// Whislist Api

export const addToWishlist = async (productId, token) => {
  try {
    const response = await Api.post(
      '/wishlist/add',
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error.response?.data || { error: 'Unknown error' };
  }
};

export const getWishlist = async (token) => {
  try {
    const response = await Api.get('/wishlist/userList', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error.response?.data || { error: 'Unknown error' };
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    // console.log(`Removing product with ID: ${productId}`);
    if (!productId) {
      throw new Error('Product ID is required');
    }
    if (!localStorage.getItem('token')) {
      throw new Error('User is not authenticated');
    }
    const res = await Api.delete(`/wishlist/remove/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return res.data;
  } catch (err) {
    console.error('Error removing from wishlist:', err.response?.data || err.message);
    throw err;
  }
};


// Admin list

export const getUsersList = async () => {
  try {
    const response = await Api.get('/user/list', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error.response?.data || { error: 'Unknown error' };
  }
}

export const getProductsList = async () => {
  try {
    const response = await Api.get('/product/list', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products list:', error);
    throw error.response?.data || { error: 'Unknown error' };
  }
}

export const getWishlistList = async () => {
  try {
    const response = await Api.get('/wishlist/all', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist list:', error);
    throw error.response?.data || { error: 'Unknown error' };
  }
}
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
    }
});



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
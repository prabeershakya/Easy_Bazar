import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; 
import { loginUserApi } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  const response = await loginUserApi({ email, password });
  console.log("Login response:", response.data);

  if (response?.data?.token) {
    localStorage.setItem('token', response.data.token);
    toast.success("Login successful!");

    const decoded = jwtDecode(response.data.token);
    console.log("Decoded token:", decoded);

    if (decoded?.role === 'admin') {
  setTimeout(() => {
    navigate('/admin');
  }, 1000);
} else if (decoded?.role === 'seller') {
  setTimeout(() => {
    navigate('/sellerDashboard');
  }, 1000);
} else {
  setTimeout(() => {
    navigate('/Home');
  }, 1000);

    }
  } else {
    toast.error("Login failed. Please check your credentials.");
  }
} catch (error) {
  console.error('Login error:', error?.response?.data || error.message || error);
  toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
    } 
      };

  return (
    <div className="flex items-center justify-center min-h-[70vh] mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">Login</h2>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            // disabled={false}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            // disabled={false}
          />
        </div>
        
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition"
        >
          Login
        </button>
        
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-orange-600 hover:underline font-semibold">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
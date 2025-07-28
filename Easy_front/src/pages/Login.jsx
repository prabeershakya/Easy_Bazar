import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        
        localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        
        
        toast.success("Login successful!");
        
        navigate("/Home"); 
      } else {
       
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
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
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
            disabled={false}
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
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            disabled={false}
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
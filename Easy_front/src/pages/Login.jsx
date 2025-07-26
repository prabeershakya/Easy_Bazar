import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    alert(`Email: ${form.email}\nPassword: ${form.password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
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
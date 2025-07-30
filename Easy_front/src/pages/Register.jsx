import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserApi } from "../api/api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", form);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await createUserApi({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "user"
      });

      const data = response.data;
      console.log("Registration response:", data);

      if (response.status === 201) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else if (data.error === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">
          Create Account
        </h2>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>

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
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition"
        >
          Create Account
        </button>

        <div className="text-center mt-2">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-orange-600 hover:underline font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

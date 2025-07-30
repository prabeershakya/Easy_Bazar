import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-orange-500 hover:underline text-lg">
        ← Go back home
      </Link>
    </div>
  );
};

export default NotFound;

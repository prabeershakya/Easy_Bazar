import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Easy Bazar</h3>
        <p className="mb-4">Your trusted online shopping destination</p>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="#" className="hover:text-orange-400">About Us</a>
          <a href="#" className="hover:text-orange-400">Contact</a>
          <a href="#" className="hover:text-orange-400">Privacy Policy</a>
          <a href="#" className="hover:text-orange-400">Terms of Service</a>
        </div>
        <p className="text-sm text-gray-400 mt-4">© 2025 Easy Bazar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
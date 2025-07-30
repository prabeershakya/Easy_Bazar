import React from 'react';
import { useState } from 'react';


function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Trigger search every time input changes
  };

  return (
    <input
      type="search"
      value={searchQuery}
      onChange={handleChange}
      placeholder="Search products..."
      className="flex-grow w-full px-4 py-2 text-base rounded-2xl border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-100 bg-white text-gray-800 placeholder-gray-400 transition-all duration-150 outline-none h-14"
    />
  );
}
export default SearchBar;
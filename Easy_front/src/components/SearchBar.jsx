import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
        type="search"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={handleSubmit}
        className="w-250 p-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 drop-shadow-sm placeholder:text-center"
        />
    );
}

export default SearchBar;

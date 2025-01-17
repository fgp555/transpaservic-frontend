import React, { useState } from "react";
import "./SearchComponent.css";

export const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Buscar..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        🔍
      </button>
    </div>
  );
};


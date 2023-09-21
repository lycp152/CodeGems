import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-input">
        <SearchIcon className="search-icon" />
        <input
          className="input"
          type="text"
          placeholder="Search…"
          value={query}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;

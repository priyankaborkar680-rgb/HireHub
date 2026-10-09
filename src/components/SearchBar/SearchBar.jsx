import { useState } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SearchBar = () => {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {

    console.log({
      keyword,
      location,
    });

    alert(`Searching : ${keyword} in ${location}`);
  };

  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Job title..."
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
      />

      <div className="divider"></div>

      <div className="location-box">

        <HiOutlineLocationMarker />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        />

      </div>

      <button onClick={handleSearch}>
        <FiSearch />
        Search
      </button>

    </div>
  );
};

export default SearchBar;
import React from "react";

export default function Search() {
  return (
    <label className="search-bar  ">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        className="input-field"
      />
    </label>
  );
}

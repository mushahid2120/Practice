import React from "react";
import countData from "../data";

export default function Search({setQuery}) {

  const CountrySearching=(e)=>{
    // const matchedData=countData.filter((country)=>country.name.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(matchedData)
    setQuery(e.target.value.toLowerCase());
  }

  return (
    <label className="search-bar  ">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        className="input-field"
        onChange={CountrySearching}
      />
    </label>
  );
}

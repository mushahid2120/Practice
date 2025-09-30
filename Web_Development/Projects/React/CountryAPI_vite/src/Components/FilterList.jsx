import React from "react";

export default function FilterList({setQuery}) {
  const regionName = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  return (
    <ul className="region-list">
      {regionName.map((region) => {
        return <li className="region" onClick={()=>{setQuery(region.toLowerCase())}} key={region}>{region}</li>;
      })}
    </ul>
  );
}

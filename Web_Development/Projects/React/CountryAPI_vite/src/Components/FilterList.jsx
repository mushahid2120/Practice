import React from "react";

export default function FilterList({ setFilterQuery, setIsOpenFilter }) {
  const regionName = ["All","Africa", "Americas", "Asia", "Europe", "Oceania"];
  return (
    <ul className="region-list">
      {regionName.map((region) => {
        return (
          <li
            className="region"
            onClick={() => {
              setFilterQuery(region==="All" ?"":region);
              
              setIsOpenFilter(false)
            }}
            key={region}
          >
            {region}
          </li>
        );
      })}
    </ul>
  );
}

import React from "react";

export default function Filter() {
  return (
    <div className="filter-bar ">
      <div className="filter-btn">
        <div className="filter-by-region">Filter by Region</div>
        <i className="fa-solid fa-angle-down dropdown-icon"></i>
      </div>
      <ul className="region-list">
        <li className="region">Africa</li>
        <li className="region">Americas</li>
        <li className="region">Asia</li>
        <li className="region">Europe</li>
        <li className="region">Oceania</li>
      </ul>
    </div>
  );
}

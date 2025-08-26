import React, { useState } from "react";
import FilterList from './FilterList'

export default function Filter({setQuery}) {
  const [isOpenFilterList,setIsOpenFilterList]=useState(false);
  return (
    <div className={`filter-bar ${isOpenFilterList ?"open-filter":""}`} onClick={()=>{setIsOpenFilterList(!isOpenFilterList)}}>
      <div className="filter-btn">
        <div className="filter-by-region">Filter by Region</div>
        <i className="fa-solid fa-angle-down dropdown-icon"></i>
      </div>
          <FilterList setQuery={setQuery}/>
    </div>
  );
}

import React from "react";
import countriesData from "../data.js";

// countriesData.map((coutr)=>console.log(coutr.name));

export default function ContryCard() {
  return (
  countriesData.map((Country) => {
    return (
      <div className="contry " key={Country.name}>
        <img src={Country.flags.png} alt="" />
        <div className="contry-detail-container">
          <div className="contry-name">{Country.name}</div>
          <div className="contry-detail">
            <div className="population-container contry-data">
              <span className="population contry-data-name">Population:</span>
              <span className="pop-num contry-data-value">{Country.population}</span>
            </div>
            <div className="region-container contry-data">
              <span className="region contry-data-name">Region:</span>
              <span className="region-name contry-data-value">{Country.population}</span>
            </div>
            <div className="capital-container contry-data">
              <span className="capital contry-data-name">Capital:</span>
              <span className="capital-name contry-data-value">{Country.capital}</span>
            </div>
          </div>
        </div>
      </div>
    );
  })
  )
}

console.log(ContryCard());

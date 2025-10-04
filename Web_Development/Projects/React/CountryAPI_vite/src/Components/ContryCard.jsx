import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function ContryCard({ matchedData }) {
  return matchedData.map(
    ({
      name,
      capital,
      population,
      flag,
      region,
      subregion,
      nativeName,
      currencies,
      languages,
      tld,
      borders,
    }) => (
      <Link
        className="contry "
        to={`/${name}`}
        state={{
          name,
          capital,
          population,
          flag,
          region,
          subregion,
          nativeName,
          currencies,
          languages,
          tld,
          borders,
        }}
        key={name}
      >
        <img src={flag} alt={name} />
        <div className="contry-detail-container">
          <div className="contry-name">{name}</div>
          <div className="contry-detail">
            <div className="population-container contry-data">
              <span className="population contry-data-name">Population:</span>
              <span className="pop-num contry-data-value">{population}</span>
            </div>
            <div className="region-container contry-data">
              <span className="region contry-data-name">Region:</span>
              <span className="region-name contry-data-value">{region}</span>
            </div>
            <div className="capital-container contry-data">
              <span className="capital contry-data-name">Capital:</span>
              <span className="capital-name contry-data-value">{capital}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}

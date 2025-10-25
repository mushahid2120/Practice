import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "./country.css";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../Contexts/ThemeProvider";

export default function CountriesDetail() {
  const [borderCountryDetail, setBorderCountryDetail] = useState([]);

  const location = useLocation();
  let {
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
  } = location.state;

  if(borders==="")
    borders=[]
  
  useEffect(() => {
    setBorderCountryDetail([])
    const allBorderDetail = Promise.all(
      borders.map((borderCode) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
          .then((res) => res.json())
          .then(([data]) => ({
            name: data.name.common,
            nativeName: Object.values(data.name.nativeName)[0].common,
            region: data.region,
            subregion: data.subregion,
            capital: data.capital,
            currencies: Object.values(data.currencies)[0].name,
            tld: data.tld.join(", "),
            population: data.population,
            languages: Object.values(data.languages).join(", "),
            flag: data.flags.png,
            borders: data.borders
          }));
      })
    );
    allBorderDetail.then((border) => {
      setBorderCountryDetail(border);
    });
  }, [name]);

    const [isDark]=useContext(ThemeContext)

  return (
    <div className={`main-container ${isDark===true ? 'darkmode':''}`}>
      <main className="main-box">
        <div href="./index.html" className="back-btn" onClick={()=>history.back()}>
          <IoMdArrowBack />
          &nbsp; Back
        </div>
        <div className="main-content">
          <div className="img-container">
            <img src={flag} alt={name} />
          </div>
          <div className="contry-text">
            <h2 className="title">{name}</h2>
            <div className="country-detail">
              <ul className="left-text">
                <li>
                  <b>Native Name: </b>
                  <span className="nativeName">{nativeName}</span>
                </li>
                <li>
                  <b>Population: </b>
                  <span className="population">{population}</span>
                </li>
                <li>
                  <b>Region: </b>
                  <span className="region">{region}</span>
                </li>
                <li>
                  <b>Sub Region: </b>
                  <span className="subregion">{subregion}</span>
                </li>
                <li>
                  <b>Capital: </b>
                  <span className="capital">{capital}</span>
                </li>
              </ul>
              <ul className="right-text">
                <li>
                  <b>Top Level Domain: </b>
                  <span className="tld">{tld}</span>
                </li>
                <li>
                  <b>Curriencies: </b>
                  <span className="currencies">{currencies}</span>
                </li>
                <li>
                  <b>Languages: </b>
                  <span className="languages">{languages}</span>
                </li>
              </ul>
            </div>
            <div className="border-contry">
              <b>Border-contries: </b>
              {borderCountryDetail.length !== 0 &&
                borderCountryDetail.map(
                  (
                    {
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
                    },
                    i
                  ) => {
                    return (
                      <Link
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
                        className="border-contrie-name"
                        key={i}
                      >
                        {name}
                      </Link>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import "./country.css";
import { Link, useLocation, useParams } from "react-router";
import { useTheme } from "../Hooks/Theme";

export default function CountriesDetail() {
  const [isDark,setIsDark]=useTheme()
  const { state } = useLocation();
  const params = useParams();
  const country_name = params.countryDetail;
  const [countryData, setCountryData] = useState(null);


  function updateCountryData(data) {
    setCountryData({
      name: (data.name?.common!==undefined ?data.name.common : data.name),
      flag: data.flags.png,
      population: data.population,
      region: data?.region,
      subregion: data?.subregion,
      capital: data?.capital   ,
      tld: (data.tld ? (data?.tld?.join(", ") ): (data?.topLevelDomain ?.join(", "))),
      languages: Object.values(data.languages)[0].name || Object.values(data.languages).join(', '),
      nativeName:
        data.name.nativeName !== undefined
          ? Object.values(data.name.nativeName)[0].common
          :  (data.name.common!==undefined ?data.name.common : data.nativeName),
      currencies: Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(", "),
      borders: [],
    });

            if (!data.borders) data.borders = [];

        Promise.all(
          data.borders.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderCountry]) => borderCountry.name.common)
              .then((bordersName) => {
                // const arrBorder=[borders];
                // arrBorder.append(borders)
                setCountryData((prevState) => ({
                  ...prevState,
                  borders: [...prevState.borders, bordersName],
                }));
              });
          })
        );
  }


  useEffect(() => {

    if(state){
    updateCountryData(state) 
    return}

    fetch(`https://restcountries.com/v3.1/name/${country_name}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      });
  }, [country_name]);

  const goBack = () => {
    history.back();
    console.log(" backing.....");
  };

  if (countryData === null)
    return (
      <div style={{ fontSize: "2rem", margin: "20px" }}>
        Loading Data............
      </div>
    );
  else
    return (
      <div className={`main-container ${isDark ?'darkmode':''}`}>
        <main className="main-box">
          <div href="./index.html" className="back-btn" onClick={goBack}>
            <i className="fa-solid fa-arrow-left-long"></i>
            &nbsp; Back
          </div>
          <div className="main-content">
            <div className="img-container">
              <img src={countryData.flag} alt={`${countryData.flag} flag`} />
            </div>
            <div className="contry-text">
              <h2 className="title">{countryData.name}</h2>
              <div className="country-detail">
                <ul className="left-text">
                  <li>
                    <b>Native Name: </b>
                    <span className="nativeName">{countryData.nativeName}</span>
                  </li>
                  <li>
                    <b>Population: </b>
                    <span className="population">{countryData.population}</span>
                  </li>
                  <li>
                    <b>Region: </b>
                    <span className="region">{countryData.region}</span>
                  </li>
                  <li>
                    <b>Sub Region: </b>
                    <span className="subregion">{countryData.subregion}</span>
                  </li>
                  <li>
                    <b>Capital: </b>
                    <span className="capital">{countryData.capital}</span>
                  </li>
                </ul>
                <ul className="right-text">
                  <li>
                    <b>Top Level Domain: </b>
                    <span className="tld">{countryData.tld}</span>
                  </li>
                  <li>
                    <b>Curriencies: </b>
                    <span className="currencies">{countryData.currencies}</span>
                  </li>
                  <li>
                    <b>Languages: </b>
                    <span className="languages">{countryData.languages}</span>
                  </li>
                </ul>
              </div>
              <div className="border-contry">
                <b>Border-contries: </b>
                {countryData.borders.length !== 0 &&
                  countryData.borders.map((ctr, i) => {
                    return (
                      <Link
                        to={`/${ctr}`}
                        className="border-contrie-name"
                        key={i}
                      >
                        {ctr}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

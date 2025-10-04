import { useState, useEffect } from "react";

export default function AllCountryData() {
  const [allCountryData, setAllCountryData] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:5500/CountryAPI_vite/data.json")
      .then((res) => res.json())
      .then((data) => {
        setAllCountryData(
          data.map((country) => {
            return ({
            name: country.name,
            population: country.population,
            region: country.region,
            capital: country.capital,
            flag: country.flag,
            nativeName: country.nativeName,
            subregion: country.subregion,
            tld: country.topLevelDomain.join(', '),
            languages: country.languages.map((lang)=>lang.name).join(", "),
            currencies: country?.currencies!==undefined ? Object.values(country.currencies)[0].name :'',
            borders: country?.borders!==undefined ?country.borders : '' 
          })}
          )
        );
      })
      .catch((error) => console.log(error));
  }, []);

  return { allCountryData };
}

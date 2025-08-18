import React from "react";
import React, { useEffect, useState } from "react";
import ContryCard from "./ContryCard";

export default function ContriesList({ query }) {
  const [countriesData, setCountriesData] = useState(null);
  console.log(query);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/Javascript%20Project/Country/data.json")
      .then((res) => res.json())
      .then((cdata) => {
        setCountriesData(cdata);
      });
  }, []);
  if(countriesData!==null){
    const matchedData=countriesData.filter((country)=> country.name.toLowerCase().includes(query))
    console.log(matchedData)

     return (<section className="contries" >
          {matchedData.map((country) => {
              return <ContryCard CoutryDetail={{
                                name: country.name,
                                flag: country.flags.png,
                                population: country.population,
                                region: country.region,
                                capital: country.capital
                                }}
                        key={country.name}/>})}
            </section>)
  }
  else
    return <p>Loading.............</p>
}
import React from 'react'
import { useState,useEffect } from 'react'
import './country.css'



export default function CountriesDetail() {
    const country_name = new URLSearchParams(window.location.search).get('country');
    const [countryData,setCountryData]=useState(null)
    useEffect(()=>{
        fetch(`https://restcountries.com/v3.1/name/${country_name}?fullText=true`)
        .then((res)=>res.json())
        .then(([data])=>{
            
            setCountryData({
                name:data.name.common,
                flag: data.flags.png,
                population: data.population,
                region: data?.region,
                subregion: data?.subregion,
                capital: data?.capital?.join(", "),
                tld: data?.tld?.join(', '),
                languages: Object.values(data.languages)?.join(', '),
                nativeName: (data.name.nativeName!==undefined ?Object.values(data.name.nativeName)[0].common : data.name.common),
                currencies: Object.values(data.currencies).map((currency)=>currency.name).join(", ")                                
            })
        })
    },[])

    const goBack=()=>{
                        history.back();
                        console.log(" backing.....")
                    }

    if(countryData===null)
        return <div style={{fontSize: "2rem",margin: '20px'}}>Loading Data............</div>
    else
            return (
                <div className="main-container">
                    <main className="main-box">
                        <div href="./index.html" className="back-btn" onClick={goBack}>
                            <i className="fa-solid fa-arrow-left-long"></i>
                            &nbsp;
                            Back
                        </div>
                        <div className="main-content">
                            <div className="img-container"><img src={countryData.flag} alt={`${countryData.flag} flag`} /></div>
                            <div className="contry-text">
                                <h2 className="title">{countryData.name}</h2>
                                <div className="country-detail">
                                    <ul className="left-text">
                                        <li><b>Native Name: </b><span className="nativeName">{countryData.nativeName}</span></li>
                                        <li><b>Population: </b><span className="population">{countryData.population}</span></li>
                                        <li><b>Region: </b><span className="region">{countryData.region}</span></li>
                                        <li><b>Sub Region: </b><span className="subregion">{countryData.subregion}</span></li>
                                        <li><b>Capital: </b><span className="capital">{countryData.capital}</span></li>
                                    </ul>
                                    <ul className="right-text">
                                        <li><b>Top Level Domain: </b><span className="tld">{countryData.tld}</span></li>
                                        <li><b>Curriencies: </b><span className="currencies">{countryData.currencies}</span></li>
                                        <li><b>Languages: </b><span className="languages">{countryData.languages}</span></li>
                                    </ul>
                                </div>
                                <div className="border-contry">
                                    <b>Border-contries: </b>                       
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            )
}

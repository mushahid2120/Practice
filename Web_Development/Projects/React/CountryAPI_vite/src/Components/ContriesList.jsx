import ContryCard from "./ContryCard";
import useAllCountryData from "../Hooks/useAllCountryData";

export default function ContriesList({query,filterQuery}) {
    const {allCountryData}=useAllCountryData()
    let matchedData;
     matchedData=allCountryData.filter((country)=>(country.name.toLowerCase().includes(query.toLowerCase()) || country.region.toLowerCase().includes(query.toLowerCase()) )).filter((country)=>(country.region.toLowerCase().includes(filterQuery.toLowerCase())))
    return (
      <section className="contries">
       <ContryCard matchedData={matchedData} />
      </section>
    );
}

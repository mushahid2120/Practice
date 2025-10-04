import { CiSearch } from "react-icons/ci";
import useAllCountryData from '../Hooks/useAllCountryData'

export default function Search({query,setQuery}) {
  console.log(query)
  return (
    <label className="search-bar  ">
      <CiSearch size={20}/>  
      <input
        type="text"
        placeholder="Search for a country..."
        className="input-field"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />
    </label>
  );
}

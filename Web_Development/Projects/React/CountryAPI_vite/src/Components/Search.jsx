import { CiSearch } from "react-icons/ci";

export default function Search() {

  return (
    <label className="search-bar  ">
      <CiSearch size={20}/>  
      <input
        type="text"
        placeholder="Search for a country..."
        className="input-field"
      />
    </label>
  );
}

import FilterList from './FilterList'
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Filter() {
  return (
    <div className={`filter-bar `}>
      <div className="filter-btn">
        <div className="filter-by-region">Filter by Region</div>
        <RiArrowDropDownLine  size={18}/>
      </div>
          <FilterList />
    </div>
  );
}

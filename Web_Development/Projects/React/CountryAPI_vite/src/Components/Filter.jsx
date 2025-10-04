import { useContext } from 'react';
import FilterList from './FilterList'
import { RiArrowDropDownLine } from "react-icons/ri";
import { FilterContext } from '../Contexts/FilterContext';

export default function Filter({filterQuery,setFilterQuery}) {

  const [isOpenFilter,setIsOpenFilter]=useContext(FilterContext);

  return (
    <div className={`filter-bar ${isOpenFilter===true ? "open-filter" :""}`} onClick={()=>setIsOpenFilter(!isOpenFilter)}>
      <div className="filter-btn">
        <div className="filter-by-region">{filterQuery==='' ?"Filter by Region" :filterQuery}</div>
        <RiArrowDropDownLine  size={20}/>
      </div>
          <FilterList setFilterQuery={setFilterQuery} setIsOpenFilter={setIsOpenFilter}/>
    </div>
  );
}

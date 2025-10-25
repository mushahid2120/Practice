import ContriesList from "./ContriesList";
import Search from "./Search";
import Filter from "./Filter";
import { useContext, useState } from "react";
import FilterProvider from "../Contexts/FilterContext";
import { ThemeContext } from "../Contexts/ThemeProvider";



export default function Home() {
  const [query,setQuery]=useState('')
  const [filterQuery,setFilterQuery]=useState('')
  const [isDark,setIsDark]=useContext(ThemeContext)
  return (
    <>
      <div className={`main-container-all-contries ${isDark===true ?"darkmode":''}`}>
        <main className="main-content-all-contries">
          <section className="search-filter">
            <Search query={query} setQuery={setQuery} />
            <FilterProvider>
              <Filter setFilterQuery={setFilterQuery} filterQuery={filterQuery}/>
            </FilterProvider>
          </section>
          <ContriesList query={query} filterQuery={filterQuery}/>
        </main>
      </div>
    </>
  );
}

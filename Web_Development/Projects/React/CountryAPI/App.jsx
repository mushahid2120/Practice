import React from "react";
import Heading from "./Components/Heading";
import Search from "./Components/Search";
import Filter from "./Components/Filter";
import ContriesList from "./Components/ContriesList";



export default function App() {
  return (
    <>
      <Heading/>
      <div className="main-container ">
        <main className="main-content">
          <section className="search-filter">
            <Search/>
            <Filter/>
          </section>
          <ContriesList/>
        </main>
      </div>
    </>
  );
}

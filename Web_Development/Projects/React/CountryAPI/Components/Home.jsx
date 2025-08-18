import React, { useState } from "react";
import React from 'react'
import ContriesList from './ContriesList'
import Search from './Search'
import Filter from './Filter'


export default function Home() {
      const [query,setQuery]=useState('')
  return (
    <>
      <div className="main-container-all-contries">
        <main className="main-content-all-contries">
          <section className="search-filter">
            <Search setQuery={setQuery}/>
            <Filter/>
          </section>
          <ContriesList query={query}/>
        </main>
      </div>
    </>
  )
}

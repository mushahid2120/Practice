import React, { useState } from "react";
import React from 'react'
import ContriesList from './ContriesList'
import Search from './Search'
import Filter from './Filter'
import { useTheme } from "../Hooks/Theme";


export default function Home() {
  const [isDark,setIsDark]=useTheme()
  const [query,setQuery]=useState('')
  return (
    <>
      <div className= {`main-container-all-contries ${isDark ?"darkmode" :""}`}>
        <main className="main-content-all-contries">
          <section className="search-filter">
            <Search setQuery={setQuery}/>
            <Filter setQuery={setQuery}/>
          </section>
          <ContriesList query={query}/>
        </main>
      </div>
    </>
  )
}

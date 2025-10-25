import React, {  useState } from 'react';
import { useTheme } from '../Hooks/Theme';


export default function Heading() {
  const [isDark,setIsDark]=  useTheme()
  return (
    <div className={`header-container ${isDark ?"darkmode" :""}`}>
        <header>
            <h2 className="headline">Where in the world?</h2>
          <div className={`darkmode-container `} onClick={()=>{
            console.log('Theme before===',isDark)
            localStorage.setItem("darkTheme" , !isDark)
            setIsDark((prevTheme)=>{return !prevTheme});
            }}>
                <i className={`fa-solid  fa-${isDark ? "sun":"moon"} moon-icon`}></i>
                <span className="darkmode-text">{isDark ? "Light" : "Dark"} Mode</span>
            </div>
        </header>
    </div>
  )
}

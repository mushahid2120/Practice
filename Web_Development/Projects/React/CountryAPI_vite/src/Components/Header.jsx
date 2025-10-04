import React, { isValidElement, useContext } from 'react'
import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa6";
import { ThemeContext } from '../Contexts/ThemeProvider';

export default function Header() {
  const [isDark,setIsDark]=useContext(ThemeContext)
  return (
    <div className={`header-container ${isDark ?'darkmode':''} `}>
        <header>
            <h2 className="headline">Where in the world?</h2>
          <div className="darkmode-container" onClick={()=>setIsDark(!isDark)}>
                {isDark===true ?<IoSunny size={18} /> :<FaRegMoon size={18}/>}
                <span className="darkmode-text">{isDark===true ?"Light":"Dark"} Mode</span>
            </div>
        </header>
    </div>
  )
}

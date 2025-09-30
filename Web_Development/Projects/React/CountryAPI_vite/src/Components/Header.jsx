import React from 'react'
import { FaRegMoon } from "react-icons/fa6";

export default function Header() {
  return (
    <div className={`header-container `}>
        <header>
            <h2 className="headline">Where in the world?</h2>
          <div className="darkmode-container">
                <FaRegMoon size={18}/>
                <span className="darkmode-text">Dark Mode</span>
            </div>
        </header>
    </div>
  )
}

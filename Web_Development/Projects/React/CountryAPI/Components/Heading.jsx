import React from 'react'

export default function Heading() {
  return (
    <div className="header-container ">
        <header>
            <h2 className="headline">Where in the world?</h2>
            <div className="darkmode-container">
                <i className="fa fa-moon-o moon-icon"></i>
                <span className="darkmode-text">Dark Mode</span>
            </div>
        </header>
    </div>
  )
}

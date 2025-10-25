import React from 'react'
import brandLogo from '../assets/brand_logo.png'
import Button from './Button'

export default function Header() {
  return (
    <header className="flex justify-between items-center px-16 py-2 font-semibold">
        <div className=""><img src={brandLogo} alt="Brand Logo" /></div>
        <nav className='lg:space-x-12 space-x-8'>
            <a href="#">MENU</a>
            <a href="#">LOCATION</a>
            <a href="#">ABOUT</a>
            <a href="#">CONTACT</a>
        </nav>
        <Button buttonName="Login" bgColor="#D01C28" textColor="white" borderColor="#D01C28" />
    </header>
  )
}

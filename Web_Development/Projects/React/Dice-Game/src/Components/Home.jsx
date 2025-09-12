import React from 'react'
import Button from './Button'
import diceImg from '/images/dice.png'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className='flex items-center justify-center max-w-[1020px] max-h-[350px]'>
        <div className="max-w-[550px]"><img src={diceImg} alt="dice Image" className="w-full" /></div>
        <div className="">
            <h1 className="text-6xl font-bold">DICE GAME</h1>
            <Link className='text-end mt-3' to="game"><Button buttonName="Play Now" buttonTheme="dark"/></Link>
            <div ></div>
        </div>
    </main>
  )
}

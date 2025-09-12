import React, { useState } from 'react'
import Button from './Button'
import Dice1 from '/images/dice_1.png'
import Dice2 from '/images/dice_2.png'
import Dice3 from '/images/dice_3.png'
import Dice4 from '/images/dice_4.png'
import Dice5 from '/images/dice_5.png'
import Dice6 from '/images/dice_6.png'
import ShowRules from './ShowRules'


export default function GamePage() {

    const allDicePic=[Dice1,Dice2,Dice3,Dice4,Dice5,Dice6]
    const [totalScore,setTotalScore]=useState(0)
    const [scoreSelected,setScoreSelected]=useState('')
    const [diceImg,setDiceImg]=useState(Dice1)
    const [showRule,setShowRule]=useState(false)
    const [error,setError]=useState('')

    const handleDiceRoll=()=>{

        if(scoreSelected===''){
            setError('You have not selected any number')
            return
        }

        const rollingResult=Math.floor(Math.random()*6);
        setDiceImg(allDicePic[rollingResult])
        if(rollingResult+1===scoreSelected)
            setTotalScore((prevState)=>prevState+scoreSelected)
        else
            setTotalScore((prevState)=>prevState-scoreSelected)
        setScoreSelected('')
    }

  return (
    <>
    <header className='flex justify-between mt-10 ml-14 mr-10 max-w-[1300px] mx-auto'>
        <div className="text-center font-semibold">
            <span className='text-5xl' >{totalScore}</span>
            <p className='text-[12px]'>Total Score</p>
        </div>
        <div className="relative">
            <p className="text-red-700 absolute -top-6 -right-0" >{error}</p>
            <ul className='flex font-semibold text-center align-center text-xl space-x-4'>
                {
                    [1,2,3,4,5,6].map((n)=>{
                        return (<li key={n} onClick={(e)=>{setScoreSelected(n)}}  className={`border-solid border-2 border-black h-8 w-8 cursor-pointer ${scoreSelected===n ? "text-white bg-black":"" }`}>{n}</li>)
                    })
                }
            </ul>
            <p className='mt-2 text-end font-semibold'>Select Number</p>
        </div>
    </header>

    <main className='flex justify-center items-center mt-4'>
        <div className="text-center space-y-1">
            <img src={diceImg} alt="" className='max-w-36 cursor-pointer mx-auto' onClick={handleDiceRoll}/>
            <p className='font-semibold text-[14px]'>Click on Dice to Roll</p>
            <Button buttonTheme="light" buttonName="Reset Score" setTotalScore={setTotalScore}/>
            <Button buttonTheme={showRule?"dark":"light"} buttonName="Show Rules" setShowRule={setShowRule}/>
            {showRule && <ShowRules/>}
        </div>

    </main>
    </>
  )
}

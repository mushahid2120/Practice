import React from 'react'

export default function  ({buttonName,buttonTheme,setTotalScore,setShowRule}) {
  console.log(buttonTheme)
  const textColor=buttonTheme==='dark' ?'white':'black';
  const bgColor=buttonTheme==='dark' ? 'black':'white';
  return (
        <button className={`w-full max-w-[160px] py-1  font-semibold rounded-[7px] border-solid border-black border-2 bg-${bgColor} text-${textColor} hover:bg-${textColor} hover:text-${bgColor} transition-all ease-in-out`} onClick={()=>{setTotalScore ?setTotalScore(0):setShowRule((prevState)=>(!prevState))}}>{buttonName}</button>
  )
}

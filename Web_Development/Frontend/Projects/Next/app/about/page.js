"use client"

import { useState } from "react"

export default function About() {
    const [fruits,setFruits]=useState(["Mongo","Apple"])
  return (
    <>
    <div className='text-2xl'>This is About Page</div>
    <button onClick={()=>{
      setFruits(null)
      // console.log(kdf)
      
    }}>
      Click Me
    </button>
    <div> 
      {
        fruits.map((f)=>(<p key={f}>{f}</p>))
      }
    </div>
    </>
  )
}

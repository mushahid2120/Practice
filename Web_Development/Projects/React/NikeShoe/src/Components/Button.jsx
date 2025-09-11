import React from 'react'

export default function Button({buttonName,bgColor,textColor,borderColor}) {
  return (
    <button className={`font-[Inter] px-3 py-[2px] bg-[${bgColor}] text-[${textColor}] font-semibold border-solid border-2 border-[${borderColor}]`}>{buttonName}</button>
  )
}

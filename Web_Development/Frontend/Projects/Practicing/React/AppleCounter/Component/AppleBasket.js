import React from 'react'

export default function AppleBasket({basketName,appleCount}) {
  return (
    <div className="apple-basket">
        <div className="apple">Apple {appleCount}</div>
        <h3 className="basket">{basketName}</h3>
    </div>
  )
}

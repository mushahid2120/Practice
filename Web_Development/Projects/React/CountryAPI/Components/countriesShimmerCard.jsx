import React from 'react'

export default function countriesShimmerCard() {
  return (
        <section className="contries" >
        {Array.from({length:10}).map((eL,i)=>{
            return <div className="contry shimmer-card" key={i}></div>
            })}
        </section>
  )
}

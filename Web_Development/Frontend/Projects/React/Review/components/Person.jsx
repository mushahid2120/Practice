import React from 'react'

export default function Person({person}) {

  return (
    <div className="person-container">
        <div className="photo-container">
            <img src={person.image} alt="" />
            <i className="fa-solid fa-quote-right quotes-icon"></i>
        </div>
        <div className="person-detail">
            <div className="person-name">{person.name.split(' ').map(([...each])=> { each[0]=each[0].toUpperCase();return each.join('')}).join(' ')}</div>
            <div className="person-job">{person.job.toUpperCase()}</div>
            <div className="person-about">{person.text}</div>
        </div>
    </div>
  )
}

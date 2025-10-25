import React from 'react'

export default function InputField({label,id,name,value,onChange,error}) {
  return (
    <div className="input-container">
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            // ref={titleRef}
          />
          <p className="error">{error}</p>
        </div>
  )
}

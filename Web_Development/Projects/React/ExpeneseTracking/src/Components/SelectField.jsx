import React from 'react'

export default function SelectField({label,id,name,value,onChange,options,defaultOption,error}) {
  return (
    <div className="input-container">
          <label htmlFor={id}>{label}</label>
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            // ref={categoryRef}
          >
          {
            defaultOption && <option value="" hidden>{defaultOption}</option>
          }
          {
            options.map((option,i)=>(
                <option value="grocery" key={i}>{option}</option>
            ))
          }
          </select>
          <p className="error">{error}</p>
        </div>
  )
}

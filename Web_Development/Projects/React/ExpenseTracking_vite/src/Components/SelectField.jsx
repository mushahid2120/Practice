import React from 'react'

export default function SelectField({label,id,name,value,setExpense}) {
  const options=['Grocery','Cloths','Bills','Education','Medicine']
  return (
    <div className="input-container">
          <label htmlFor={id}>{label}</label>
          <select name={name} id={id} value={value} onChange={(e)=>{setExpense((prevState)=>({...prevState,[name]:e.target.value}))}}>
            <option value="" hidden>Select Category</option>
          {
            options.map((option,i)=>(
                <option value={option} key={i}>{option}</option>
            ))
          } 
          </select>
          {/* <p className="error">error</p> */}
        </div>
  )
}
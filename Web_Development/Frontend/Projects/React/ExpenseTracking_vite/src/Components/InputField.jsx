import React from 'react'

export default function InputField({label,id,name,value,setExpense}) {
  return (
    <div className="input-container">
          <label id={id} name={name}>{label}</label>
          <input id={id} name={name} value={value} onChange={(e)=>{setExpense((prevState)=>({...prevState,[name]:e.target.value}))}}/>
          {/* <p className="error">error</p> */}
        </div>
  )
}
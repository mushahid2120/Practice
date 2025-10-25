import React, { useState } from 'react'

export  function useFilter(dataList , callBack) {
  
    const [query,setQuery]=useState('')
    const filterData=dataList.filter((data)=>(callBack(data).toLowerCase().includes(query)))

  return [filterData,setQuery]
}

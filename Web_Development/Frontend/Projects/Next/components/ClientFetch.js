"use client"
import  { useEffect,useState } from 'react'

export default function ClientFetch() {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        async function fetchUser(){
            const response=await fetch('https://dummyjson.com/users/?_limit=10')
            const data= await response.json()
            setUsers(data.users)
        }
        fetchUser()
    },[])
    console.log(users)
  return (
    <div>{JSON.stringify(users)}</div>
  )
}

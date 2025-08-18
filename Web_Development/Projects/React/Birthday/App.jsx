import List from "./List"
import { useState } from "react"
import data from "./data.js"
import './style.css'


export default function App(){
    const [people,setPeople]=useState(data)
    const [peopleCount,setPeopleCount]=useState(10)
    const handleClear=(e)=>{
        setPeople(null)
        setPeopleCount("0")
    }

    return (
        <main className="container">
            <h2 className="heading" >{peopleCount} Birthdays Today</h2>
            <List data={people}/>
            <button onClick={handleClear}>Clear All</button>
        </main>
    )
}
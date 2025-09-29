import { useState } from 'react'

import './App.css'
import Counter from './Components/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Counter name="Class Based Component  "/>
  )
}

export default App

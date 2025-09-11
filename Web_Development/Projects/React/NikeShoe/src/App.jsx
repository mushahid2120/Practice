import { useState } from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-[Poppins]">
      <Header />
      <Hero/>
    </div>
  );
}

export default App;

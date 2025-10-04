import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Outlet } from "react-router-dom";
import ThemeProvider from "./Contexts/ThemeProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

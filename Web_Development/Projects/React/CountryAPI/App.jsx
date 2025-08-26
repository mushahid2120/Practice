
import { useState } from "react";
import Heading from "./Components/Heading";
import { Outlet } from "react-router";
import ThemeContext, { ThemeProvider } from "./Contexts/Theme";
import { ThemeProvider } from "./Contexts/Theme";


export default function App() {
  
  return (
  <ThemeProvider >
    <Heading />
    <Outlet />
  </ThemeProvider>
    
  );
}

import { useState , Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import './App.css'


function App() {

  

  return (
    <>
      <Header />
      <Suspense fallback={<h1 className="text-red-400 text-center">Loading</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;

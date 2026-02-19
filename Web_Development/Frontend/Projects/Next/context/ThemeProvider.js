"use client"

const { createContext, useState, useContext, useEffect } = require("react")

const ThemeContext=createContext()

export function useTheme(){

    return useContext(ThemeContext)
}

export default function ThemeProvider({children}){
    const [isDark,setIsDark]=useState(true)
    function toggleTheme(){
        setIsDark((prevState)=>!prevState)
    }

    useEffect(()=>{
        if(isDark) document.querySelector('body').classList.add('dark')
        else {
            document.querySelector('body').classList.remove('dark')
            document.querySelector('body').classList.add('light')}
    },[isDark])

    return (
        <ThemeContext.Provider value={{isDark,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
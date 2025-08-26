import { createContext, useState } from "react";

const ThemeContext = createContext('Welcome')

export function ThemeProvider({children}){
    console.log(children)
    const [isDark,setIsDark]=useState(JSON.parse(localStorage.getItem('darkTheme')) || false)
    return (
        <ThemeContext.Provider value={[isDark,setIsDark]}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
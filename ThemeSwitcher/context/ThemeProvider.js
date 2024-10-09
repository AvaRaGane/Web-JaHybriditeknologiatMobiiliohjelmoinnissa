import { ThemeContext } from './ThemeContext'
import React, { useState }from 'react'

export default function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    const toggleDarkMode = () => {
        setIsDarkMode(prevDarkMode => !prevDarkMode)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode}}>
            { children }
        </ThemeContext.Provider>
    )
}
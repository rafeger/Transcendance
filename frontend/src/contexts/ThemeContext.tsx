import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark';

type ThemeContextType = { theme: Theme; toggleTheme: () => void; };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        return (savedTheme === "light" ? "light" : "dark");
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used in ThemeProvider");
    }
    return (context);
}
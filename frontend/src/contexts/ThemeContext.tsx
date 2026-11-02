import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type ThemeContextType = { isDark: boolean; toggleTheme: () => void; };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") !== "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    function toggleTheme() {
        setIsDark((current) => !current);
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
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

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("set-sleuth-theme") as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (defaultTheme === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, [defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("set-sleuth-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}

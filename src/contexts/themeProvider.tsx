import { createContext, useState } from "react";
import { ReactNode } from "react";

interface MyProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<any>(null);

const ThemeProvider: React.FC<MyProviderProps> = ({ children }) => {
  const storedTheme = localStorage.getItem("isDarkTheme");
  const theme = storedTheme ? JSON.parse(storedTheme) : false;
  const [darkTheme, setDarkTheme] = useState(theme);

  return (
    <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider};


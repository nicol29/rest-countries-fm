import { createContext, useState } from "react";
import { ReactNode } from "react";

interface MyProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<any>(null);

const ThemeProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider};


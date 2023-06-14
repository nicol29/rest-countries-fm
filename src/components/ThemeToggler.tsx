import sunLight from "@icons/light/weather-sunny-custom.png";
import sunDark from "@icons/dark/weather-sunny-custom.png"
import moonLight from "@icons/light/weather-night-custom.png";
import moonDark from "@icons/dark/weather-night-custom.png";
import { ThemeContext } from "../contexts/themeProvider";
import { useContext, useEffect } from "react";
import "../styles/light/app.scss";
import "../styles/light/themeToggler.scss";
import darkCSS from "../styles/dark/app.scss?raw";

const ThemeToggler = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const darkStyleSheet = document.getElementById("dark-stylesheet");

    if (darkTheme) {
      localStorage.setItem("isDarkTheme", JSON.stringify(darkTheme));

      const styleTag = document.createElement("style");

      if (!darkStyleSheet) {
        styleTag.id = "dark-stylesheet";
        styleTag.innerHTML = darkCSS;

        document.head.appendChild(styleTag);
      }
    } else {
      localStorage.setItem("isDarkTheme", JSON.stringify(darkTheme));

      if (darkStyleSheet) darkStyleSheet.parentNode?.removeChild(darkStyleSheet);
    }
  }, [darkTheme]);

  return (
    <div className="theme-toggler">
      <img src={darkTheme ? sunDark : sunLight}/>
      <div className="switch" onClick={() => setDarkTheme(!darkTheme)}>
        <div></div>
      </div>
      <img src={darkTheme ? moonDark : moonLight}/>
    </div>
  )
}

export default ThemeToggler;
import sunLight from "@icons/light/weather-sunny-custom.png";
import sunDark from "@icons/dark/weather-sunny-custom.png"
import moonLight from "@icons/light/weather-night-custom.png";
import moonDark from "@icons/dark/weather-night-custom.png";
import { ThemeContext } from "../contexts/themeProvider";
import { useContext, useEffect } from "react";
import "../styles/light/app.scss";
import "../styles/light/themeToggler.scss";

const ThemeToggler = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem("isDarkTheme", JSON.stringify(darkTheme));

      if (document.styleSheets[4]) {
        document.styleSheets[4].disabled = false;
      } else {
        import("../styles/dark/app.scss");
      }
    } else {
      localStorage.setItem("isDarkTheme", JSON.stringify(darkTheme));

      if (document.styleSheets[4]) document.styleSheets[4].disabled = true;
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
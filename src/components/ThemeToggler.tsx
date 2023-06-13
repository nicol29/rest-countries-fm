import sunLight from "../assets/images/icons/light/weather-sunny-custom.png";
// import sunDark from ""
import moonLight from "../assets/images/icons/light/weather-night-custom.png";
// import moonDark
import "../styles/light/themeToggler.scss";
// import"../styles/dark/app.scss";
import { ThemeContext } from "../contexts/themeProvider";
import { useContext, useEffect } from "react";

const ThemeToggler = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    darkTheme ? import("../styles/dark/app.scss") : import("../styles/light/app.scss");
  }, [darkTheme]);

  return (
    <div className="theme-toggler">
      <img src={sunLight}/>
      <div className="switch" onClick={() => setDarkTheme(!darkTheme)}>
        <div></div>
      </div>
      <img src={moonLight}/>
    </div>
  )
}

export default ThemeToggler;
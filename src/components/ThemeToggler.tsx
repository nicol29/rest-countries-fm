import sunLight from "../assets/images/icons/light/weather-sunny-custom.png";
// import sunDark from ""
import moonLight from "../assets/images/icons/light/weather-night-custom.png";
// import moonDark
import "../styles/light/themeToggler.scss";

const ThemeToggler = () => {
  return (
    <div className="theme-toggler">
      <img src={sunLight}/>
      <div className="switch">
        <div></div>
      </div>
      <img src={moonLight}/>
    </div>
  )
}

export default ThemeToggler;
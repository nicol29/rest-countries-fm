import { useState, useRef, useEffect, useContext } from "react";
import ThemeToggler from "./ThemeToggler";
import CountryCard from "./CountryCard";
import searchLight from "@icons/light/magnify-custom.png";
import searchDark from "@icons/dark/magnify-custom.png";
import chevronLight from "@icons/light/chevron-down-custom.png";
import chevronDark from "@icons/dark/chevron-down-custom.png";
import uniqid from 'uniqid';
import { ThemeContext } from "../contexts/themeProvider";


const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [input, setInput] = useState("");
  const { darkTheme } = useContext(ThemeContext);
  const dropDownOptions = useRef<HTMLDivElement | null>(null);

  const searchForFilter = async (continent: string) => {
    const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`);
    const data = await response.json();

    setCountries(data);
  }

  const searchForCountry = async () => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    const data = await res.json();

    setCountries(data);
  }

  const manageInput = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchForCountry();
      setInput("");
    }
  }

  useEffect(() => {
    (async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      setCountries(data);
    })()
  }, []);

  useEffect(() => {
    if (dropDownOptions.current) {
      filterToggle ? dropDownOptions.current.style.display = "block" : dropDownOptions.current.style.display = "none";
    }
  }, [filterToggle]);

  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <ThemeToggler />
      </header>
      <section>
        <div className="max-width">
          <div className="search-filter">
            <div className="search-bar">
              <img src={darkTheme ? searchDark : searchLight} 
              onClick={() => searchForCountry()}/>
              <input 
                type="text" 
                placeholder="Search for a country..." 
                value={input} 
                onChange={(e) => 
                setInput(e.target.value)} 
                onKeyDown={(e) => manageInput(e)}
              />
            </div>
            <div className="dropdown-menu" onClick={() => setFilterToggle(!filterToggle)}>
              <p>Filter by Region</p>
              <img src={darkTheme ? chevronDark : chevronLight}/>
              <div className="options" ref={dropDownOptions}>
                <ul>
                  <li onClick={() => searchForFilter("Africa")}>Africa</li>
                  <li onClick={() => searchForFilter("America")}>America</li>
                  <li onClick={() => searchForFilter("Asia")}>Asia</li>
                  <li onClick={() => searchForFilter("Europe")}>Europe</li>
                  <li onClick={() => searchForFilter("Oceania")}>Oceania</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="country-cards-container">
            {countries.length > 0 ? countries.map(country => <CountryCard country={country} key={uniqid()}/>) 
            : <p>No Country Found</p>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;
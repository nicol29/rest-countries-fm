import { useState } from "react";
import ThemeToggler from "./ThemeToggler";
import CountryCard from "./CountryCard";
import searchLight from "../assets/images/icons/light/magnify-custom.png";
import chevronLight from "../assets/images/icons/light/chevron-down-custom.png";
import uniqid from 'uniqid';
import { Routes, Route } from 'react-router-dom';


const HomePage = () => {
  const [countries, setCountries] = useState([]);


  useState(() => {
    (async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      console.log(data)
      setCountries(data);
    })()
  }, []);

  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <ThemeToggler />
      </header>
      <section>
        <div className="search-filter">
          <div className="search-bar">
            <img src={searchLight}/>
            <input type="text" placeholder="Search for a country..."/>
          </div>
          <div className="dropdown-menu">
            <p>Filter by Region</p>
            <img src={chevronLight}/>
            <div className="options">
              <ul>
                <li>Africa</li>
                <li>America</li>
                <li>Asia</li>
                <li>Europe</li>
                <li>Oceania</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="country-cards-container">
          {countries.map(country => (
            <CountryCard country={country} key={uniqid()}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage;
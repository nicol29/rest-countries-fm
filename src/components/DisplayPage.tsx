import ThemeToggler from "./ThemeToggler";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import "../styles/light/displayPage.scss";
import backArrowLight from "../assets/images/icons/light/keyboard-backspace-custom.png";
import uniqid from "uniqid";

interface BorderingCountriesInterface {
  countries: string[] | null;
}


const DisplayPage : React.FC = () => {
  const initialBorderingCountries: BorderingCountriesInterface = {
    countries: null
  };
  const [country, setCountry] = useState<any>(null);
  const [borderingCountries, setBorderingCountries] = useState<BorderingCountriesInterface>(initialBorderingCountries);
  const { id } = useParams();
  const navigate = useNavigate();


  const getCurrency = () => {
    const key = Object.keys(country?.currencies);
    const currency = country?.currencies[key[0]];

    return currency.name;
  }

  const getLanguages = () => {
    const languagesObj = country.languages;
    let languages = "";

    for (const key in languagesObj) {
      languages += " " + languagesObj[key] + ",";
    }

    return languages.slice(0, -1);
  }

  const formatNumberWithCommas = () => {
    return country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const changeCountryUrl = (e : React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/countries/${e.target.innerText}`);
    navigate(0);
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
      const data = await res.json();
      
      setCountry(data[0]);
    })()
  }, []);

  useEffect(() => {
    if (country) {
      (async () => {
        const allBordingCountries = await Promise.all(country.borders.map(async border => {
          const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`);
          const country = await res.json();
    
          return country[0].name.common;
        }));

        const borderingCountriesData: BorderingCountriesInterface = {
          countries: allBordingCountries
        };
        
        setBorderingCountries(borderingCountriesData);
      })()
    }
  }, [country]);

  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <ThemeToggler />
      </header>
      <section className="display-country-section">
        <div className="max-width">
          <button className="back-button" onClick={() => navigate("/")}>
            <img src={backArrowLight}/>
            Back
          </button>
          { country &&
            <article className="country-details">
              <img src={country?.flags.png}/>
              <div>
                <h1>{country?.name.common}</h1>
                <div className="info-sect">
                  <div>
                    <p><span>Native Name: </span>{country.altSpellings[1]}</p>
                    <p><span>Population: </span>{formatNumberWithCommas()}</p>
                    <p><span>Region: </span>{country.region}</p>
                    <p><span>Sub Region: </span>{country.subregion}</p>
                    <p><span>Capital: </span>{country.capital[0]}</p>
                  </div>
                  <div>
                    <p><span>Top Level Domain: </span>{country.tld[0]}</p>
                    <p><span>Currencies: </span>{getCurrency()}</p>
                    <p><span>Languages: </span>{getLanguages()}</p>
                  </div>
                </div>
                <div>
                  <h3>Border Countries:</h3>
                  {borderingCountries.countries && 
                    <div className="bordering-countries">
                      {borderingCountries.countries.map(country => (
                        <div key={uniqid()} onClick={(e) => changeCountryUrl(e)}>
                          {country}
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </section>
    </>
  )
}

export default DisplayPage;
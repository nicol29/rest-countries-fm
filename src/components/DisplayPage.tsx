import ThemeToggler from "./ThemeToggler";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import "../styles/light/displayPage.scss";
import backArrowLight from "@icons/light/keyboard-backspace-custom.png";
import backArrowDark from "@icons/dark/keyboard-backspace-custom.png";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/themeProvider";

interface BorderingCountriesInterface {
  countries: string[] | null;
}


const DisplayPage : React.FC = () => {
  const initialBorderingCountries: BorderingCountriesInterface = {
    countries: null
  };
  const [country, setCountry] = useState<any>(null);
  const [borderingCountries, setBorderingCountries] = useState<BorderingCountriesInterface>(initialBorderingCountries);
  const { darkTheme } = useContext(ThemeContext);
  const { id } = useParams();


  const getCurrency = () => {
    if (country?.currencies) {
      const key = Object.keys(country?.currencies);
      const currency = country?.currencies[key[0]];

      return currency.name;
    } else {
      return null
    }
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

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
      const data = await res.json();
      
      setCountry(data[0]);
    })()
  }, [id]);

  useEffect(() => {
    if (country?.borders) {
      (async () => {
        const allBordingCountries = await Promise.all(country.borders.map(async (border: string) => {
          const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`);
          const country = await res.json();

          return country[0].name.common;
        }));

        const borderingCountriesData: BorderingCountriesInterface = {
          countries: allBordingCountries
        };

        setBorderingCountries(borderingCountriesData);
      })();
    }
  }, [country]);

  return (
    <>
      <header>
        <Link to="/" className="link">
          <h1>Where in the world?</h1>
        </Link>
        <ThemeToggler />
      </header>
      <section className="display-country-section">
        <div className="max-width">
          <Link to="/" className="link" style={{ display: 'inline-block' }}>
            <button className="back-button">
              <img src={darkTheme ? backArrowDark : backArrowLight}/>
              Back
            </button>
          </Link>
          { country ?
            <article className="country-details">
              <img src={country?.flags.png}/>
              <div>
                <h1>{country?.name.common}</h1>
                <div className="info-sect">
                  <div>
                    <p><span>Native Name: </span>{country.altSpellings[1] ? country.altSpellings[1] : null}</p>
                    <p><span>Population: </span>{formatNumberWithCommas()}</p>
                    <p><span>Region: </span>{country.region}</p>
                    <p><span>Sub Region: </span>{country.subregion}</p>
                    <p><span>Capital: </span>{country.capital ? country.capital[0] : null}</p>
                  </div>
                  <div>
                    <p><span>Top Level Domain: </span>{country.tld[0]}</p>
                    <p><span>Currencies: </span>{getCurrency()}</p>
                    <p><span>Languages: </span>{getLanguages()}</p>
                  </div>
                </div>
                  {borderingCountries?.countries && 
                    <div>
                      <h3>Border Countries:</h3>
                      <div className="bordering-countries">
                        {borderingCountries?.countries.map(country => (
                          <Link to={`/countries/${country}`} key={uniqid()} className="link">
                            <div>
                              {country}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  }
              </div>
            </article> : <p style={{marginTop: "50px"}}>No country with the name {`"${id}"`} found</p>
          }
        </div>
      </section>
    </>
  )
}

export default DisplayPage;
import "../styles/light/countryCard.scss";
import { Link } from "react-router-dom";

interface CountryInterface {
  country: any;
}


const CountryCard : React.FC<CountryInterface> = ({ country }) => {
  const formatNumberWithCommas = () => {
    return country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Link to={`/countries/${country.name.common}`} className="link">
      <div className="country-card">
        <img src={country.flags.png}/>
        <div>
          <h2>{country.name.common}</h2>
          <p><span>Population: </span>{formatNumberWithCommas()}</p>
          <p><span>Region: </span>{country.region}</p>
          <p><span>Capital: </span>{country.capital}</p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;


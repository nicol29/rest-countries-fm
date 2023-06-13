import "../styles/light/countryCard.scss";
import { useNavigate } from "react-router";


interface CountryInterface {
  country: any;
}


const CountryCard : React.FC<CountryInterface> = ({ country }) => {
  const navigate = useNavigate();

  const formatNumberWithCommas = () => {
    return country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const navigateToDetailedDesc = () => {
    navigate(`/countries/${country.name.common}`);
    navigate(0);
  }

  return (
    <div className="country-card" onClick={navigateToDetailedDesc}>
      <img src={country.flags.png}/>
      <div>
        <h2>{country.name.common}</h2>
        <p><span>Population: </span>{formatNumberWithCommas()}</p>
        <p><span>Region: </span>{country.region}</p>
        <p><span>Capital: </span>{country.capital}</p>
      </div>
    </div>
  );
}

export default CountryCard;


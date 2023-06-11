import "../styles/light/countryCard.scss";

interface CountryInterface {
  country: any;
}


const CountryCard : React.FC<CountryInterface> = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flags.png}/>
      <div>
        <h2>{country.name.common}</h2>
        <p><span>Population: </span>{country.population}</p>
        <p><span>Region: </span>{country.region}</p>
        <p><span>Capital: </span>{country.capital}</p>
      </div>
    </div>
  );
}

export default CountryCard;


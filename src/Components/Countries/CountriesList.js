import Country from "./Country";

import classes from "./CountriesList.module.css";

function CountriesList({ countries }) {
  return (
    <div className={classes.list}>
      {countries.map((country) => (
        <Country
          key={country.name}
          name={country.name}
          flag={country.flag}
          region={country.region}
          capital={country.capital}
          population={country.population}
        />
      ))}
    </div>
  );
}

export default CountriesList;

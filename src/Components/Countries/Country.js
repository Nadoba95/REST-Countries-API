import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/theme-context";

import classes from "./Country.module.css";

function Country({ name, flag, population, region, capital }) {
  const navigate = useNavigate();
  const { isLight } = useThemeContext();

  function goToSelectedCountryHandler() {
    navigate(`/countries/${name}`);
  }

  const listItemClasses = `${classes["list-item"]} ${
    !isLight && classes.active
  }`;

  return (
    <div className={listItemClasses} onClick={goToSelectedCountryHandler}>
      <img alt={`${name} flag`} src={flag} />
      <h3>{name}</h3>
      <p>
        <b>Population:</b> {population}
      </p>
      <p>
        <b>Region:</b> {region}
      </p>
      <p>
        <b>Capital:</b> {capital}
      </p>
    </div>
  );
}

export default Country;

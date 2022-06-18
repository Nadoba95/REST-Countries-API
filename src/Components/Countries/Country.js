import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";

import classes from "./Country.module.css";

function Country(props) {
  const navigate = useNavigate();
  const themeCtx = useContext(ThemeContext);
  const { isLight } = themeCtx;

  function goToSelectedCountryHandler() {
    navigate(`/countries/${props.name}`);
  }

  const listItemClasses = `${classes["list-item"]} ${
    !isLight && classes.active
  }`;

  return (
    <div className={listItemClasses} onClick={goToSelectedCountryHandler}>
      <img alt={`${props.name} flag`} src={props.flag} />
      <h3>{props.name}</h3>
      <p>
        <b>Population:</b> {props.population}
      </p>
      <p>
        <b>Region:</b> {props.region}
      </p>
      <p>
        <b>Capital:</b> {props.capital}
      </p>
    </div>
  );
}

export default Country;

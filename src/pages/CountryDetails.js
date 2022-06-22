import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BordersList from "../Components/Borders/BordersList";
import { useThemeContext } from "../context/theme-context";
import useHttp from "../hooks/use-http";
import classes from "./CountryDetails.module.css";

function CountryDetails() {
  const [country, setCountry] = useState([]);

  const { isLight } = useThemeContext();
  const { name } = useParams();
  const navigate = useNavigate();

  const { sendRequest: fetchCountryDetails, isLoading } = useHttp();

  useEffect(() => {
    function transformData(dataObj) {
      let languagesArr = [];

      dataObj[0].languages.forEach((language) =>
        languagesArr.push(language.name)
      );

      setCountry({
        name: dataObj[0].name,
        nativeName: dataObj[0].nativeName,
        flag: dataObj[0].flags.svg,
        population: dataObj[0].population,
        region: dataObj[0].region,
        subRegion: dataObj[0].subregion,
        capital: dataObj[0]?.capital || "none",
        languages: languagesArr.join(", "),
        borders: dataObj[0].borders || [],
        currencies: dataObj[0].currencies[0].name,
        topLevelDomain: dataObj[0]?.topLevelDomain[0] || "none",
      });
    }

    fetchCountryDetails(
      `https://restcountries.com/v2/name/${name}`,
      transformData
    );
  }, [fetchCountryDetails, name]);

  function goBackPageHandler() {
    navigate(-1);
  }

  const wrapperClasses = `${classes.wrapper} ${!isLight && classes.active}`;
  const buttonClasses = !isLight ? classes.active : "";

  let content = <p className={classes.loading}>Loading Country Details...</p>;

  if (!isLoading && country.borders) {
    content = (
      <>
        <button className={buttonClasses} onClick={goBackPageHandler}>
          <i className="fa-solid fa-arrow-left-long"></i>
          <p>Back</p>
        </button>
        <div className={classes.details}>
          <img alt={`${country.name} flag`} src={country.flag} />
          <div>
            <h4>{country.name}</h4>
            <div className={classes.details_row}>
              <div>
                <p>
                  <b>Native Name:</b> {country.nativeName}
                </p>
                <p>
                  <b>Population:</b> {country.population}
                </p>
                <p>
                  <b>Region:</b> {country.region}
                </p>
                <p>
                  <b>Sub Region:</b> {country.subRegion}
                </p>
                <p>
                  <b>Capital:</b> {country.capital}
                </p>
              </div>
              <div>
                <p>
                  <b>Top Level Domain:</b> {country.topLevelDomain}
                </p>
                <p>
                  <b>Currencies:</b> {country.currencies}
                </p>
                <p>
                  <b>Languages:</b> {country.languages}
                </p>
              </div>
            </div>
            <div className={classes.borders}>
              <p>
                <b>Border Countries:</b>
              </p>
              <BordersList borders={country.borders} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={wrapperClasses}>
      <div className={classes.background}>{content}</div>
    </div>
  );
}

export default CountryDetails;

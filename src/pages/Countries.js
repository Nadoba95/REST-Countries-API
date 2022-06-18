import { useContext, useEffect, useRef, useState } from "react";

import CountriesList from "../Components/Countries/CountriesList";
import { ThemeContext } from "../context/theme-context";
import useHttp from "../hooks/use-http";
import classes from "./Countries.module.css";

const countriesAPI = "https://restcountries.com/v3.1/all";

function Countries() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showRegions, setShowRegions] = useState(false);
  const [regionText, setRegionText] = useState("Filter by Region");

  const inputSearchRef = useRef();
  const themeCtx = useContext(ThemeContext);
  const { isLight } = themeCtx;

  const { sendRequest: fetchCountries, isLoading } = useHttp();

  useEffect(() => {
    function transformData(dataObj) {
      const loadedCountries = [];

      dataObj.forEach((data) =>
        loadedCountries.push({
          name: data.name.common,
          flag: data.flags.png,
          region: data.region,
          capital: data.capital?.[0] || "none",
          population: data.population,
        })
      );

      setCountries(loadedCountries);
      setAllCountries(loadedCountries);
    }

    fetchCountries(countriesAPI, transformData);
  }, [fetchCountries]);

  function searchCountriesHandler() {
    const input = inputSearchRef.current.value.trim().toLowerCase();

    setCountries(
      allCountries.filter((country) =>
        country.name.toLowerCase().startsWith(input)
      )
    );

    if (regionText !== "Filter by Region") {
      setRegionText("Filter by Region");
    }
    if (showRegions) {
      setShowRegions(false);
    }
  }

  function showRegionsHandler() {
    setShowRegions((prevShowRegions) => !prevShowRegions);
  }

  function showCountriesFromRegionHandler(e) {
    let region = e.target.textContent;
    setRegionText(region);

    if (region === "America") {
      region = region + "s";
    }

    setCountries(allCountries.filter((country) => country.region === region));

    if (inputSearchRef) {
      inputSearchRef.current.value = "";
    }
  }

  function showAllCountriesHandler() {
    setCountries(allCountries);
    setRegionText("Filter by Region");
    if (inputSearchRef) {
      inputSearchRef.current.value = "";
    }
  }

  let content = <p className={classes.loading}>Loading countries...</p>;

  if (countries.length > 0) {
    content = <CountriesList countries={countries} />;
  }

  if (countries.length === 0 && !isLoading) {
    content = <p className={classes.loading}>No country found</p>;
  }

  const backgroundClasses = `${classes.background} ${
    !isLight && classes.active
  }`;
  const separatorClasses = `${classes.separator} ${!isLight && classes.active}`;

  return (
    <div className={backgroundClasses}>
      <div className={separatorClasses}>
        <div className={classes.search}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            ref={inputSearchRef}
            onChange={searchCountriesHandler}
            placeholder="Search for a country..."
          ></input>
        </div>
        <div className={classes.filter} onClick={showRegionsHandler}>
          <p>{regionText}</p>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        {showRegions && (
          <span className={classes.region}>
            <p onClick={showCountriesFromRegionHandler}>Africa</p>
            <p onClick={showCountriesFromRegionHandler}>America</p>
            <p onClick={showCountriesFromRegionHandler}>Asia</p>
            <p onClick={showCountriesFromRegionHandler}>Europe</p>
            <p onClick={showCountriesFromRegionHandler}>Oceania</p>
            <p onClick={showAllCountriesHandler}>Show All</p>
          </span>
        )}
      </div>
      {content}
    </div>
  );
}

export default Countries;

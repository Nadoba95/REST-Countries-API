import { useEffect, useState } from "react";

import { useHttpAll } from "../../hooks/use-http";
import BorderCountry from "./BorderCountry";
import classes from "./BordersList.module.css";

function CountryBorders({ borders }) {
  const [borderNames, setBorderNames] = useState([]);

  const { sendRequest: fetchCountryBorders, sendPromiseAll } = useHttpAll();

  useEffect(() => {
    if (borders.length === 0) {
      return;
    }

    function setData(dataObj) {
      let borderArr = [];

      dataObj.forEach((border) => borderArr.push(border.name));

      setBorderNames(borderArr);
    }

    sendPromiseAll(
      borders.map((border) => {
        return fetchCountryBorders(`https://restcountries.com/v2/alpha/${border}`);
      }),
      setData
    );
  }, [fetchCountryBorders, sendPromiseAll, borders]);

  if (borders.length === 0) {
    return <p>No borders</p>;
  }

  return (
    <div className={classes.list}>
      {borderNames.map((border) => (
        <BorderCountry key={border} name={border} />
      ))}
    </div>
  );
}

export default CountryBorders;

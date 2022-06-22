import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/theme-context";
import classes from "./BorderCountry.module.css";

function BorderCountry({ name }) {
  const navigate = useNavigate();
  const { isLight } = useThemeContext();

  function goToBorderCountryHandler() {
    navigate(`/countries/${name}`);
  }

  const buttonClasses = `${classes.button} ${!isLight && classes.active}`;

  return (
    <div className={buttonClasses} onClick={goToBorderCountryHandler}>
      {name}
    </div>
  );
}

export default BorderCountry;

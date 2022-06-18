import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import classes from "./BorderCountry.module.css";

function BorderCountry(props) {
  const navigate = useNavigate();
  const themeCtx = useContext(ThemeContext);
  const { isLight } = themeCtx;

  function goToBorderCountryHandler() {
    navigate(`/countries/${props.name}`);
  }

  const buttonClasses = `${classes.button} ${!isLight && classes.active}`;

  return (
    <div className={buttonClasses} onClick={goToBorderCountryHandler}>
      {props.name}
    </div>
  );
}

export default BorderCountry;

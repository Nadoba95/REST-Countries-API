import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../context/theme-context";
import classes from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const themeCtx = useContext(ThemeContext);
  const { isLight, changeTheme } = themeCtx;

  function goToStartingPageHandler() {
    navigate("/countries");
  }

  const headerClasses = `${classes.header} ${!isLight && classes.active}`;

  return (
    <div className={headerClasses}>
      <h1 onClick={goToStartingPageHandler}>Where in the world?</h1>
      <p onClick={changeTheme}>
        {isLight ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
        {isLight ? "Dark mode" : "Light mode"}
      </p>
    </div>
  );
}

export default Header;

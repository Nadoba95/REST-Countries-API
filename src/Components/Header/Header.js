import { useNavigate } from "react-router-dom";

import { useThemeContext } from "../../context/theme-context";
import classes from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const { isLight, changeTheme } = useThemeContext();

  function goToStartingPageHandler() {
    navigate("/countries");
  }

  const headerClasses = `${classes.header} ${!isLight && classes.active}`;

  return (
    <div className={headerClasses}>
      <div>
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
    </div>
  );
}

export default Header;

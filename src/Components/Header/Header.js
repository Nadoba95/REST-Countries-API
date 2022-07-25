import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/theme-context";
import classes from "./Header.module.css";

function Header() {
  const [showArrow, setShowArrow] = useState(false);
  const navigate = useNavigate();
  const { isLight, changeTheme } = useThemeContext();

  function goToStartingPageHandler() {
    navigate("/countries");
  }

  function goToTopHandler() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function showArrowHandler() {
    if (window.scrollY > 200) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  }

  window.addEventListener("scroll", showArrowHandler);

  const headerClasses = `${classes.header} ${!isLight && classes.active}`;
  const arrowUpClasses = `${classes["arrow-up"]} ${
    showArrow && classes.shown
  } ${!isLight && classes.active}`;

  return (
    <>
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
      <div className={arrowUpClasses} onClick={goToTopHandler}>
        <i className="fa-solid fa-arrow-up"></i>
      </div>
    </>
  );
}

export default Header;

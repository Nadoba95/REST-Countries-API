import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  isLight: true,
  changeTheme: () => {},
});

function ThemeContextProvider(props) {
  const [isLight, setIsLight] = useState(true);

  function changeThemeHandler() {
    setIsLight(!isLight);
  }

  return (
    <ThemeContext.Provider
      value={{ isLight: isLight, changeTheme: changeThemeHandler }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

export const useThemeContext = () => useContext(ThemeContext);

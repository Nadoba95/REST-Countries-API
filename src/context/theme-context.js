import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  isLight: true,
  changeTheme: () => {},
});

function ThemeContextProvider({ children }) {
  const [isLight, setIsLight] = useState(true);

  function changeThemeHandler() {
    setIsLight(!isLight);
  }

  return (
    <ThemeContext.Provider
      value={{ isLight: isLight, changeTheme: changeThemeHandler }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContextProvider;

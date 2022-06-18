import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ThemeContextProvider from "./context/theme-context";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </BrowserRouter>
);

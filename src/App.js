import { Route, Routes, Navigate } from "react-router-dom";

import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/countries" />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:name" element={<CountryDetails />} />
        <Route path="*" element={<Navigate to="/countries" />} />
      </Routes>
    </>
  );
}

export default App;

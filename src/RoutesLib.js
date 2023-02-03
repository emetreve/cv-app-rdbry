//Router
import { Routes, Route } from "react-router-dom";
import ROUTES from "./config/routes";
//Components
import HomePage from "./pages/homePage/HomePage";

function RoutesLib() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default RoutesLib;

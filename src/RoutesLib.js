//Router
import { Routes, Route } from "react-router-dom";
import ROUTES from "./config/routes";
//Components
import HomePage from "./pages/homePage/HomePage";
import PersonalPage from "./pages/personalPage/PersonalPage";
import ExperiencePage from "./pages/experiencePage/ExperiencePage";

function RoutesLib() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.PERSONAL} element={<PersonalPage />} />
      <Route path={ROUTES.EXPERIENCE} element={<ExperiencePage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default RoutesLib;

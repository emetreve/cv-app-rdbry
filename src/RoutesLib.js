//Router
import { Routes, Route } from "react-router-dom";
import ROUTES from "./config/routes";
//Pages
import HomePage from "./pages/homePage/HomePage";
import PersonalPage from "./pages/personalPage/PersonalPage";
import ExperiencePage from "./pages/experiencePage/ExperiencePage";
import EducationPage from "./pages/educationPage/EducationPage";

function RoutesLib() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.PERSONAL} element={<PersonalPage />} />
      <Route path={ROUTES.EXPERIENCE} element={<ExperiencePage />} />
      <Route path={ROUTES.EDUCATION} element={<EducationPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default RoutesLib;

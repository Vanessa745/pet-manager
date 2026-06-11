import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "../components/PublicLayout";
import PrivateLayout from "../components/PrivateLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

import PrivateRoute from "./PrivateRoute";
import EspeciesPage from "../pages/EspeciesPage";
import RazasPage from "../pages/RazasPage";
import DuenosPage from "../pages/DuenosPage";
import MascotasPage from "../pages/MascotasPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/especies" element={<EspeciesPage />} />
            <Route path="/razas" element={<RazasPage />} />
            <Route path="/duenos" element={<DuenosPage />} />
            <Route path="/mascotas" element={<MascotasPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
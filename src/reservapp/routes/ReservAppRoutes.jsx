import { Navigate, Route, Routes } from "react-router-dom";
import { AccountPage, CalendarPage, CompaniesPage, CompanyPage } from "../pages";
import { ReservAppPage } from "../pages/ReservAppPage";

export const ReservAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ReservAppPage />} />
      <Route path="/calendario/:id" element={<CalendarPage />} />
      <Route path="/cuenta" element={<AccountPage />} />
      <Route path="/reservaciones/:id" element={<CompanyPage />} />
      <Route path="/reservar/" element={<CompaniesPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

import { CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useAuthStore } from "../hooks";
import { ReservAppRoutes } from "../reservapp/routes/ReservAppRoutes";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  // const authStatus = "not-authenticated"; // 'authenticated'

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <CircularProgress color="inherit" />
      </Grid>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <Route path="/auth/*" element={<AuthRoutes />} />
      ) : (
        <Route path="/*" element={<ReservAppRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

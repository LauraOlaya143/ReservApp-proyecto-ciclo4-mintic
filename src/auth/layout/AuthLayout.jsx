import { Grid, Typography } from "@mui/material";
import logo from "../../assets/img/Logo.svg";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.main",
        padding: 4,
      }}
      className="animate__animated animate__fadeIn animate__delay-2s"
    >
      <Grid item xs={3} sx={{ width: { sm: 350 } }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <img src={logo} className="imgLogo" />
          <Typography
            variant="h5"
            component="h1"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            ReservApp
          </Typography>
        </Grid>

        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};

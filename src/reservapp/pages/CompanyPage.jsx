import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReservationStore } from "../../hooks";
import { Reservations } from "../components";
import { ReservAppLayout } from "../layout/ReservAppLayout";

export const CompanyPage = () => {
  const { reservations, startLoadingReservations } = useReservationStore();

  const { setActiveCompany } = useReservationStore();

  const { id } = useParams();

  const reservationsByCompany = reservations.filter((reser) => reser.empresa._id === id);

  const company = reservationsByCompany.find((reser) => reser);

  const navigate = useNavigate();

  const handleClick = () => {
    setActiveCompany(id);
    navigate(`/calendario/${id}`);
  };

  useEffect(() => {
    startLoadingReservations();
  }, []);

  return (
    <ReservAppLayout>
      <Container maxWidth="sm">
        <Grid container alignItems="center" columnGap={{ xs: 2 }} sx={{ mb: 4 }}>
          <Avatar src={company?.empresa.logo}></Avatar>
          <Typography>{company?.empresa.name}</Typography>
        </Grid>

        <Grid>
          <Typography
            sx={{
              border: "1px solid red",
              borderRadius: 1,
              p: 1,
              color: "red",
            }}
          >
            Recuerda que puedes liberar hasta con 2 horas de anticipación
          </Typography>
        </Grid>

        <Reservations reservations={reservationsByCompany} ruta="reservaciones" />

        <Box
          sx={{
            display: "grid",
            position: "absolute",
            bottom: 30,
            left: 0,
            width: "100vw",
            justifyItems: "center",
            background: "#F5F5F5",
          }}
        >
          <Button variant="contained" onClick={handleClick}>
            Agregar reserva
          </Button>
        </Box>
      </Container>
    </ReservAppLayout>
  );
};

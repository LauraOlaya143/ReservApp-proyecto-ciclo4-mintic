import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsRangeToday } from "../../helpers";
import { useReservationStore } from "../../hooks";
import { Reservations } from "../components";
import { ReservAppLayout } from "../layout/ReservAppLayout";

export const ReservAppPage = () => {
  const { reservations, startLoadingReservations } = useReservationStore();

  const reservationsToday = reservationsRangeToday(reservations);

  useEffect(() => {
    startLoadingReservations();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reservar");
  };

  return (
    <ReservAppLayout>
      <Container maxWidth="sm">
        <Typography sx={{ mb: 2, mt: 2 }}>
          Tienes {reservationsToday.length} reservas para el día de hoy ⭐
        </Typography>

        <Reservations reservations={reservationsToday} ruta={"reservaciones"} />

        <Box
          sx={{
            display: "grid",
            position: "absolute",
            bottom: 30,
            left: 0,
            width: "100vw",
            justifyItems: "center",
          }}
        >
          <Button variant="contained" onClick={handleClick}>
            Deseas hacer una reserva?
          </Button>
        </Box>
      </Container>
    </ReservAppLayout>
  );
};

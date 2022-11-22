import { Button, Grid, TextField } from "@mui/material";
import moment from "moment/moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CalendarPicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { ReservAppLayout } from "../layout/ReservAppLayout";
import { useState } from "react";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useReservationStore } from "../../hooks";

export const CalendarPage = () => {
  const navigate = useNavigate();

  const { startSavingReservation } = useReservationStore();

  const { id } = useParams();

  const [date, setDate] = useState(moment());
  const [hour, setHour] = useState(moment("2020-01-01 12:00"));

  const onSubmit = async () => {
    const dateReservation = moment(
      `${date.format("YYYY-MM-DD")}${hour.format("HH:mm:SS")}`,
      "YYYY-MM-DD HH:mm:SS"
    );

    await startSavingReservation({ fecha: dateReservation.toDate(), empresa: id });
  };

  const handleClickInicio = () => {
    navigate("/");
  };

  return (
    <ReservAppLayout>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        className="animate__animated animate__fadeIn"
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CalendarPicker
            date={date}
            disablePast={true}
            direction="column"
            onChange={(newDate) => setDate(newDate)}
          />
          <TimePicker
            renderInput={(params) => <TextField {...params} />}
            value={hour}
            label="Hora"
            minutesStep={30}
            onChange={(newValue) => {
              setHour(newValue);
            }}
            minTime={moment("2018-01-01T08:00")}
            maxTime={moment("2018-01-01T17:30")}
          />
        </LocalizationProvider>
      </Grid>
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
        <Button variant="contained" onClick={onSubmit}>
          Agregar reserva
        </Button>

        <Button variant="outlined" onClick={handleClickInicio} sx={{ width: 165, mt: 2 }}>
          Inicio
        </Button>
      </Box>
    </ReservAppLayout>
  );
};

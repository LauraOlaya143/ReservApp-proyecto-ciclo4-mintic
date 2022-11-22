import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useReservationStore } from "../../hooks";

export const Reservations = (props = []) => {
  const navigate = useNavigate();

  const { startDeletingReservation, setActiveReservation } = useReservationStore();

  const handleDelete = (deleteId) => {
    Swal.fire({
      title: "Deseas liberar tu reserva?",
      width: 300,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Liberar",
      cancelButtonText: "Cancelar",
      background: "#F5F5F5",
      backdrop: "rgba(0, 0, 0, 0.7)",
      confirmButtonColor: "#E2711D",
      cancelButtonColor: "#FF4848",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Reserva liberada", "", "success");
        startDeletingReservation(deleteId);
      }
    });
  };

  const handleClick = (reser) => {
    setActiveReservation(reser.id);

    if (!location.pathname.includes("/reservaciones")) {
      navigate(`/${props.ruta}/${reser.empresa._id}`);
    }
  };

  let mesAnyo = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      className="animate__animated animate__fadeIn"
      flexWrap="nowrap"
      sx={{
        overflow: "hidden",
        overflowY: "scroll",
        height: "50vh",
        width: "100%",
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#FFB627",
          borderRadius: 2,
        },
      }}
    >
      {props.reservations.map((reser, index) => {
        return (
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: "white",
              p: 3,
              mt: 2,
              borderRadius: 2,
              boxShadow: 2,
              cursor: "pointer",
            }}
            onClick={() => handleClick(reser)}
            key={index}
          >
            <Grid item sx={{ textAlign: "center", ml: -1 }} xs={3}>
              <Typography sx={{ fontSize: 24, fontWeight: "bold", lineHeight: 1 }}>
                {reser.fecha.date()}
              </Typography>
              <Typography sx={{ fontSize: 20, lineHeight: 1 }}>
                {mesAnyo[reser.fecha.month()]}
              </Typography>
            </Grid>

            <Grid item xs={location.pathname != "/" ? 9 : 7}>
              <Typography>{reser.empresa.name}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>{`${reser.fecha.format(
                "hh:mm a"
              )}`}</Typography>
            </Grid>

            <Avatar
              xs={2}
              sx={{ width: 40, height: 40 }}
              style={{ display: location.pathname != "/" ? "none" : "" }}
              src={reser.empresa.logo}
            ></Avatar>

            <Grid item xs={5}></Grid>
            <Button
              xs={8}
              variant="contained"
              size="small"
              onClick={() => handleDelete(reser.id)}
              style={{ display: location.pathname.includes("/reservaciones") ? "" : "none" }}
            >
              Liberar
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

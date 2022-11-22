import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import reservappApi from "../api/reservappApi";
import { convertReservationToDate } from "../helpers/";
import { onActiveCompany, onActiveReservation, onDeleteReservation, onLoadEvents } from "../store";

export const useReservationStore = () => {
  const dispatch = useDispatch();

  const { reservations, activeEvent, reservationActive } = useSelector(
    (state) => state.reservaciones
  );

  const startSavingReservation = async (reservation) => {
    try {
      await reservappApi.post("/reservation", reservation);
      Swal.fire({
        title: "Reserva guardada!",
        icon: "success",
        confirmButtonColor: "#E2711D",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "No se pudo guardar",
        text: error.response.data.msg,
        icon: "warning",
        confirmButtonColor: "#E2711D",
      });
    }
  };

  const startLoadingReservations = async () => {
    try {
      const { data } = await reservappApi.get("/reservation");
      const reservations = convertReservationToDate(data.reservas);

      dispatch(onLoadEvents(reservations));
    } catch (error) {
      console.log("Error cargando las reservas");
      console.log(error);
    }
  };

  const setActiveCompany = (company) => {
    dispatch(onActiveCompany(company));
  };

  const setActiveReservation = (reservation) => {
    dispatch(onActiveReservation(reservation));
  };

  const startDeletingReservation = async (reservationActive) => {
    try {
      await reservappApi.delete(`/reservation/${reservationActive}`);

      dispatch(onDeleteReservation());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  return {
    // Propiedades
    reservations,
    activeEvent,
    reservationActive,

    //Métodos
    startSavingReservation,
    setActiveReservation,
    setActiveCompany,
    startLoadingReservations,
    startDeletingReservation,
  };
};

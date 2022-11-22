import moment from "moment/moment";

export const convertReservationToDate = (reservations = []) => {
  const reservationsOrder = reservations.sort((r1, r2) => {
    if (r1.fecha.valueOf() > r2.fecha.valueOf()) return 1;
    if (r1.fecha.valueOf() < r2.fecha.valueOf()) return -1;
    return 0;
  });

  return reservationsOrder.map((reser) => {
    reser.fecha = moment(reser.fecha);

    return reser;
  });
};

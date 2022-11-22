import moment from "moment";

export const reservationsRangeToday = (reservations = []) => {
  const nowDateStart = moment().hours("00").minutes("00").seconds("00");
  const startDate = moment(nowDateStart, "DD/MM/YYYY").valueOf();

  const nowDateEnd = moment().hours("24").minutes("00").seconds("00");
  const endDate = moment(nowDateEnd, "DD/MM/YYYY").valueOf();

  const reservationsToday = reservations.filter(
    (reser) => reser.fecha.valueOf() >= startDate && reser.fecha.valueOf() <= endDate
  );

  return reservationsToday;
};

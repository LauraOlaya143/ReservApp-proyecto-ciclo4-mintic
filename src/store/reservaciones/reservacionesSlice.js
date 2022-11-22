import { createSlice } from "@reduxjs/toolkit";

export const reservacionesSlice = createSlice({
  name: "reservaciones",
  initialState: {
    isLoadingEvents: true,
    reservations: [],
    activeEvent: null,
    reservationActive: null,
    company: null,
  },
  reducers: {
    onActiveReservation: (state, { payload }) => {
      state.reservationActive = payload;
    },

    onActiveCompany: (state, { payload }) => {
      state.company = payload;
    },

    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((reser) => {
        const exists = state.reservations.some((dbEvent) => dbEvent.id === reser.id);
        if (!exists) {
          state.reservations.push(reser);
        }
      });
    },

    onDeleteReservation: (state) => {
      state.reservations = state.reservations.filter((res) => res.id !== state.reservationActive);
      state.reservationActive = null;
    },

    onLogoutApp: (state) => {
      state.isLoadingEvents = true;
      state.reservations = [];
      state.activeEvent = null;
      state.reservationActive = null;
      state.company = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onActiveCompany,
  onActiveReservation,
  onAddNewReservation,
  onDeleteReservation,
  onLoadEvents,
  onLogoutApp,
} = reservacionesSlice.actions;

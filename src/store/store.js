import { configureStore } from "@reduxjs/toolkit";
import { reservacionesSlice, authSlice, companiesSlice } from "./";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    reservaciones: reservacionesSlice.reducer,
    companies: companiesSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

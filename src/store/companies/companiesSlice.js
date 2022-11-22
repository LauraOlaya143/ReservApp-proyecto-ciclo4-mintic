import { createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    isLoadingCompanies: true,
    companies: [
      //tempEvent
    ],
    activeCompany: null,
  },
  reducers: {
    onLoadCompanies: (state, { payload = [] }) => {
      state.isLoadingCompanies = false;
      state.companies = [];
      payload.forEach((company) => {
        const exists = state.companies.some((dbCompany) => dbCompany._id === company.id);
        if (!exists) {
          state.companies.push(company);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoadCompanies } = companiesSlice.actions;

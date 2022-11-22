import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCompanyStore } from "../../hooks/useCompanyStore";
import { Companies } from "../components";
import { ReservAppLayout } from "../layout/ReservAppLayout";

export const CompaniesPage = () => {
  const { companies, startLoadingCompanies } = useCompanyStore();

  useEffect(() => {
    startLoadingCompanies();
  }, []);

  return (
    <ReservAppLayout>
      <Container maxWidth="sm">
        <Typography sx={{ mb: 2, mt: 2 }}>En donde desearias resrevar? 🤔</Typography>
        <Companies companies={companies} />
      </Container>
    </ReservAppLayout>
  );
};

import { Avatar, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Companies = (props = []) => {
  const navigate = useNavigate();

  const handleClick = (company) => {
    console.log(company);

    navigate(`/calendario/${company._id}`);
  };

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
        width: "100% ",
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
      {props.companies.map((company, index) => {
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
            onClick={() => handleClick(company)}
            key={index}
          >
            <Avatar xs={2} sx={{ width: 40, height: 40 }} src={company.logo}></Avatar>

            <Grid item xs={10}>
              <Typography variant="h6" component="h1" sx={{ fontSize: 18 }}>
                {company.name}
              </Typography>
              <Typography>{company.dias}</Typography>
              <Typography>{company.horas}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

import { Box } from "@mui/system";
import { NavBar } from "../components";

export const ReservAppLayout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5", display: "flex", pl: 3, pr: 3 }}>
      <NavBar />

      <Box component="main" sx={{ flexGrow: 1, pt: 13, height: "100vh" }}>
        {children}
      </Box>
    </Box>
  );
};

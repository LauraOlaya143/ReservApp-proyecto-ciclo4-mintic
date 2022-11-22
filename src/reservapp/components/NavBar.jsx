import {
  ArrowBackIosNew,
  CalendarToday,
  InboxOutlined,
  LibraryAdd,
  Logout,
  Person,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgAvatar from "../../assets/img/avatar.jpg";
import { useAuthStore } from "../../hooks";

export const NavBar = () => {
  const navigate = useNavigate();

  const { startLogout, user } = useAuthStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onNavigateBack = () => {
    navigate(-1);
  };

  const onNavigateAccount = () => {
    navigate("/cuenta");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.main",
          pt: 3,
          pr: 2,
          pb: 1,
          pl: 2,
          boxShadow: "none",
          zIndex: 100,
        }}
      >
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            {location.pathname === "/" ? (
              <Grid item>
                <Typography variant="h6" sx={{ color: "black", fontWeight: "light" }}>
                  {user.gender === "male" ? "Bienvenido" : "Bienvenida"}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "text.main", fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {user.name}
                </Typography>
              </Grid>
            ) : (
              <Button>
                <ArrowBackIosNew onClick={onNavigateBack} sx={{ width: 30, height: 30 }} />
              </Button>
            )}

            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <Avatar alt="imgAvatar" src={imgAvatar} sx={{ width: 50, height: 50 }} />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: "250px", p: 2, color: "#000000" }}>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={() => setIsDrawerOpen(close)}>
              <Avatar alt="imgAvatar" src={imgAvatar} sx={{ width: 45, height: 45, mr: 1 }} />
            </IconButton>
          </Grid>

          <List>
            <ListItem disablePadding sx={{ pt: 1, pb: 1 }} onClick={onNavigateAccount}>
              <ListItemButton>
                <ListItemIcon>
                  <Person sx={{ color: "#231F20" }} />
                </ListItemIcon>
                <ListItemText primary="Cuenta" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ pt: 1, pb: 1 }}>
              <ListItemButton>
                <ListItemIcon>
                  <LibraryAdd sx={{ color: "#231F20" }} />
                </ListItemIcon>
                <ListItemText primary="Vincular reservación" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ pt: 1, pb: 1 }} onClick={startLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout sx={{ color: "#231F20" }} />
                </ListItemIcon>
                <ListItemText primary="Salir" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

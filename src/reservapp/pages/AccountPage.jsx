import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthStore, useForm } from "../../hooks";
import { ReservAppLayout } from "../layout/ReservAppLayout";

export const AccountPage = () => {
  const { user, startUpload } = useAuthStore();

  const formData = {
    name: user.name,
    surnames: user.surnames,
    // email: "",
    password: "",
    repeatPassword: "",
    gender: user.gender,
    uid: user.uid,
  };

  const formValidations = {
    name: [(value) => value.length >= 1, "El nombre es obligatorio"],
    surnames: [(value) => value.length >= 1, "El apellido es obligatorio"],
  };

  const {
    formState,
    name,
    surnames,
    password,
    repeatPassword,
    onInputChange,
    isFormValid,
    nameValid,
    surnamesValid,
    passwordValid,
    repeatPasswordValid,
    gender,
  } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    startUpload(formState);
  };

  return (
    <ReservAppLayout>
      <Container maxWidth="xs" className="animate__animated animate__fadeIn">
        <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: "500" }}>
          Cuenta
        </Typography>

        <form onSubmit={onSubmit}>
          <Grid container rowSpacing={4} alignItems="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                variant="standard"
                name="name"
                value={name}
                onChange={onInputChange}
                error={!!nameValid && formSubmitted}
                helperText={nameValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apellido"
                variant="standard"
                name="surnames"
                value={surnames}
                onChange={onInputChange}
                error={!!surnamesValid && formSubmitted}
                helperText={surnamesValid}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>Género</Typography>
            </Grid>

            <Grid item xs={9}>
              <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={gender}
                  name="gender"
                  onChange={onInputChange}
                  label="Genero"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"male"}>Hombre</MenuItem>
                  <MenuItem value={"female"}>Mujer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                variant="standard"
                type="password"
                name="password"
                autoComplete="on"
                value={password}
                onChange={onInputChange}
                helperText={"La contraseña debe de tener más de 6 letras"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Repetir Contraseña"
                variant="standard"
                type="password"
                name="repeatPassword"
                autoComplete="on"
                value={repeatPassword}
                onChange={onInputChange}
              />
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} onClick={onSubmit}>
              Actualizar datos
            </Button>
            <Button fullWidth variant="text" color="error">
              Eliminar cuenta
            </Button>
          </Grid>
        </form>
      </Container>
    </ReservAppLayout>
  );
};

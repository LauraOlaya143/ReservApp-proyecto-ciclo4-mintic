import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  name: "",
  surnames: "",
  email: "",
  password: "",
  repeatPassword: "",
  gender: "",
};

const formValidations = {
  name: [(value) => value.length >= 1, "El nombre es obligatorio"],
  surnames: [(value) => value.length >= 1, "El apellido es obligatorio"],
  email: [(value) => value.includes("@"), "El correo debe tener un @"],
  password: [(value) => value.length >= 6, "La contraseña debe de tener más de 6 letras"],
};

export const RegisterPage = () => {
  const { startRegister, errorMessage } = useAuthStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState,
    name,
    surnames,
    email,
    password,
    repeatPassword,
    onInputChange,
    isFormValid,
    nameValid,
    surnamesValid,
    emailValid,
    passwordValid,
    repeatPasswordValid,
    gender,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log(formState);
    if (!isFormValid) return;
    startRegister(formState);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire({
        title: "Error en la autentificación",
        text: errorMessage,
        icon: "error",
        background: "#F5F5F5",
        backdrop: "rgba(0, 0, 0, 0.7)",
        confirmButtonColor: "#E2711D",
      });
    }
  }, [errorMessage]);

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombres"
              type="text"
              placeholder="Nombres"
              fullWidth
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={nameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Apellidos"
              type="text"
              placeholder="Apellidos"
              fullWidth
              name="surnames"
              value={surnames}
              onChange={onInputChange}
              error={!!surnamesValid && formSubmitted}
              helperText={surnamesValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="*******"
              autoComplete="on"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Repetir contraseña"
              type="password"
              placeholder="*******"
              autoComplete="on"
              fullWidth
              name="repeatPassword"
              value={repeatPassword}
              onChange={onInputChange}
              error={!!repeatPasswordValid && formSubmitted}
              helperText={repeatPasswordValid}
            />
          </Grid>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="genero">Genero</InputLabel>
            <Select
              labelId="genero"
              id="genero"
              name="gender"
              value={gender}
              label="Genero"
              onChange={onInputChange}
            >
              <MenuItem value={"male"}>Masculino</MenuItem>
              <MenuItem value={"female"}>Femenino</MenuItem>
            </Select>
            <FormHelperText>Requerido</FormHelperText>
          </FormControl>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth onClick={onSubmit}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

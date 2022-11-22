import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import reservappApi from "../api/reservappApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onUpdate,
} from "../store/auth/authSlice";
import { onLogoutApp } from "../store/reservaciones/reservacionesSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await reservappApi.post("/auth", {
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({ name: data.name, uid: data.uid, gender: data.gender, surnames: data.surnames })
      );
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startUpload = async (userUpdated) => {
    dispatch(onChecking());
    dispatch(onUpdate(userUpdated));
    try {
      await reservappApi.put("/auth", userUpdated);
      Swal.fire({
        title: "Datos actualizados!",
        icon: "success",
        confirmButtonColor: "#E2711D",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "No se pudo actualizar",
        text: error.response.data.msg,
        icon: "warning",
        confirmButtonColor: "#E2711D",
      });
    }
  };

  const startRegister = async ({ email, password, name, gender, surnames }) => {
    dispatch(onChecking());

    try {
      const { data } = await reservappApi.post("/auth/new", {
        email,
        password,
        name,
        gender,
        surnames,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({ name: data.name, uid: data.uid, gender: data.gender, surnames: data.surnames })
      );
      Swal.fire({
        title: "Cuenta creada con éxito!",
        icon: "success",
        confirmButtonColor: "#E2711D",
      });
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await reservappApi.get("/auth/renew");

      console.log(data); // ME TRAE USUARIO DIFERENTE DESDE ACA

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({ name: data.name, uid: data.uid, gender: data.gender, surnames: data.surnames })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutApp());
    dispatch(onLogout());
  };

  return {
    //Propiedades
    status,
    user,
    errorMessage,
    //Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
    startUpload,
  };
};

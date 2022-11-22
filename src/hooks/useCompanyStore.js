import { useDispatch, useSelector } from "react-redux";
import reservappApi from "../api/reservappApi";
import { onLoadCompanies } from "../store";

export const useCompanyStore = () => {
  const dispatch = useDispatch();

  const { companies } = useSelector((state) => state.companies);

  const startLoadingCompanies = async () => {
    try {
      const { data } = await reservappApi.get("/companies");
      dispatch(onLoadCompanies(data.empresas));
    } catch (error) {
      console.log("Error cargando las empresas");
      console.log(error);
    }
  };

  return {
    // Propiedades
    companies,
    //Métodos
    startLoadingCompanies,
  };
};

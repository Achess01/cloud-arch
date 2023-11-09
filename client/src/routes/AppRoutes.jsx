import { Routes, Route } from "react-router";
import { Link, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { Login, Home } from "src/users";


import { useUser } from "src/utils/useUser";

const NoRoleUser = () => {
  return (
    <>
      <h1>Usted no puede ingresar al sistema, consulte con el administrador</h1>
      <Link to="/login">Regresar al login</Link>
    </>
  );
};

export const AppRoutes = () => {
  const user = useUser();
  return (
    <Routes>
      <Route element={user ? <Navigate to="/" /> : <Login />} path="/login" exact />
      <Route element={<PrivateRoutes />} >
        <Route element={<Home />} path="/" exact />
      </Route>
    </Routes>
  );
};

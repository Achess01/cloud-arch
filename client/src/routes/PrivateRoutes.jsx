import { Outlet, Navigate } from "react-router-dom";
import { NavBar } from "src/components/NavBar";
import { useUser } from "src/utils/useUser";


const PrivateRoutes = ({ admin = false }) => {
  const user = useUser();

  if (!user || !user.token) return <Navigate to="/login" />;

  return !admin || user.is_admin ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;

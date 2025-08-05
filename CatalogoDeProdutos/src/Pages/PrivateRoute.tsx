import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Ou um spinner
  }

  console.log(isAuthenticated);
  localStorage.removeItem("site");

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/LoginOurRegister" replace state={{ from: location }} />;
};

export default PrivateRoute;
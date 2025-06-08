import { Navigate, Outlet } from 'react-router-dom';

const isAuth = () => {
  return !!localStorage.getItem('user'); // basic check
};

const ProtectedRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

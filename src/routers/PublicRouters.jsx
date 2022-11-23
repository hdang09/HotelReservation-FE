import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../app/authSlice';

const PublicRouters = () => {
  const isAuthenticated = useSelector(authSelector);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRouters;

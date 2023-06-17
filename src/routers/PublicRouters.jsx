import { Navigate, Outlet } from 'react-router-dom';

import { authSelector } from '../app/authSlice';
import { useSelector } from 'react-redux';

const PublicRouters = () => {
  const isAuthenticated = useSelector(authSelector);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRouters;

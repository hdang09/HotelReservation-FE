import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { authSelector } from '../app/authSlice';

const PrivateRouters = () => {
  const isAuthenticated = useSelector(authSelector);
  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouters;

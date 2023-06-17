import { Calendar, Home, Login, Reservation, Rooms, Settings } from '../pages';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Default from '../layout/Default';
import PrivateRouters from './PrivateRouters';
import PublicRouters from './PublicRouters';
import jwtDecode from 'jwt-decode';
import { signOut } from '../app/authSlice';
import { useDispatch } from 'react-redux';

const publicRoutes = [
  {
    name: 'Login',
    element: <Login />,
    path: '/login',
  },
];

const privateRoutes = [
  {
    name: 'Home',
    element: <Home />,
    path: '/',
  },
  {
    name: 'Reservation',
    element: <Reservation />,
    path: '/reservation',
  },
  {
    name: 'Rooms',
    element: <Rooms />,
    path: '/rooms',
  },
  {
    name: 'Settings',
    element: <Settings />,
    path: '/settings',
  },
  {
    name: 'Calendar',
    element: <Calendar />,
    path: '/calendar',
  },
];

const RouterComponent = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem('token')) {
    const tokenFromLocal = JSON.stringify(localStorage.getItem('token'));
    if (jwtDecode(tokenFromLocal).exp < Date.now() / 1000) {
      dispatch(signOut());
    }
  }
  return (
    <Router>
      <Routes>
        <Route element={<PublicRouters />}>
          {publicRoutes.map((route) => (
            <Route key={route.name} element={route.element} path={route.path}></Route>
          ))}
        </Route>

        <Route element={<PrivateRouters />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.name}
              element={<Default>{route.element}</Default>}
              path={route.path}
            ></Route>
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export { publicRoutes, privateRoutes };
export default RouterComponent;

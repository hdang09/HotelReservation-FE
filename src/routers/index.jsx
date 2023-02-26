import { Home, Reservation, Rooms, Cleaning, Settings, Calendar, Login } from '../pages';
import PrivateRouters from './PrivateRouters';
import PublicRouters from './PublicRouters';
import Default from '../layout/Default';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../app/authSlice';
import jwtDecode from 'jwt-decode';

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
    name: 'Cleaning',
    element: <Cleaning />,
    path: '/cleaning',
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
    const tokenInLocal = JSON.stringify(localStorage.getItem('token'));
    if (jwtDecode(tokenInLocal).exp < Date.now() / 1000) {
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

import { Home, Reservation, Rooms, Cleaning, Settings, Calendar, Login } from '../pages';
import Default from '../layout/Default';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const RouterComponent = () => (
  <Router>
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.name} element={route.element} path={route.path}></Route>
      ))}
    </Routes>
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.name}
          element={<Default>{route.element}</Default>}
          path={route.path}
        ></Route>
      ))}
    </Routes>
  </Router>
);

export { publicRoutes, privateRoutes };
export default RouterComponent;

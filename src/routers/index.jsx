import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Reservation, Rooms } from '../pages'
import Default from '../layout/Default'

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
]

const publicRoutes = [{ name: 'Login' }]

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
)

export { publicRoutes, privateRoutes }
export default RouterComponent

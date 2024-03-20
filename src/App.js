import { BrowserRouter as Router, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Registration';
import HomePage from './component/HomePage';
import TopMovies from './component/TopMovies';
import FavoriteMovies from './component/Favorites';
import HeaderPage from './component/HeaderPage';
import store from './reduxstore/store';
import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

function RoutesComponent() {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log('Token:', token);
    if (token && token != null && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/home');
    }
  }, [token, navigate, location]);

  let routing = useRoutes([
    { path: '/', element: token && token != null ? <Navigate to="/home" /> : <><Login /></> },
    { path: 'login', element: token && token != null ? <Navigate to="/home" /> : <><Login /></> },
    { path: 'register', element: token && token != null ? <Navigate to="/home" /> : <><Register /></> },
    { path: 'home', element: token && token != null ? <><HomePage /></> : <><Login /></> },
    { path: 'top-movies', element: token && token != null ? <><TopMovies /></> : <><Login /></> },
    { path: 'favorite-movies', element: token && token != null ? <><FavoriteMovies /></> : <><Login /></> },
  ]);

  return routing;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <HeaderPage />
        <div>
          <RoutesComponent />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
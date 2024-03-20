import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Route element={element} {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
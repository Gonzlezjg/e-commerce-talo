import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const roles = {
  CLIENT: ['/', '/resume', '/profile'],
  ADMIN: ['/', '/resume', '/profile'],
};

const PrivateRoutes = ({ children, path }) => {
  const { isAuthenticated, role: userRoles } = useSelector(
    (state) => state.user.user
  );
  const location = useLocation();

  const redirectToLogin = () => (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  const isAuthorized = () => {
    if (!userRoles) {
      return redirectToLogin();
    }

    const allowedRoutes = roles[userRoles] || [];

    if (allowedRoutes.includes(path)) {
      return isAuthenticated ? children : redirectToLogin();
    }
    return (
      <div>
        <h1>Sin permisos para acceder a la ruta</h1>
      </div>
    );
  };

  return isAuthorized();
};

export default PrivateRoutes;

import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: PropsWithChildren) {
  const hasAccess = false;

  return hasAccess ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PAGE_ROUTE } from '@/shared/constants/page-path';

function PrivateRoute({ children }: PropsWithChildren) {
  const hasAccess = true;

  return hasAccess ? children : <Navigate to={PAGE_ROUTE.login} />;
}

export default PrivateRoute;

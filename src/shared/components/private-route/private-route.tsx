import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PAGE_ROUTE } from '@/shared/constants/page-path';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';

type PrivateRouteProps = PropsWithChildren<{
  authStatus: TAuthStatus;
}>;

function PrivateRoute({ authStatus, children }: PrivateRouteProps) {
  return (
    authStatus === AUTH_STATUS.auth
      ? children
      : <Navigate to={PAGE_ROUTE.login} />
  );
}

export default PrivateRoute;

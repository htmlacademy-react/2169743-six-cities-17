import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PAGE_ROUTE } from '@/shared/constants/page-path';
import { AUTH_STATUS } from '@/shared/constants/auth';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getUserAuthStatus } from '@/entities/User/model/user.selector';

function PrivateRoute({ children }: PropsWithChildren) {
  const authStatus = useAppSelector(getUserAuthStatus);

  return (
    authStatus === AUTH_STATUS.auth
      ? children
      : <Navigate to={PAGE_ROUTE.login} />
  );
}

export default PrivateRoute;

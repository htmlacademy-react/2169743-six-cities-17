import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PageRoute } from '@/shared/constants/page-path';
import { AuthStatus } from '@/shared/constants/auth';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getUserAuthStatus } from '@/entities/User/model/user.selector';

function PrivateRoute({ children }: PropsWithChildren) {
  const authStatus = useAppSelector(getUserAuthStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={PageRoute.Login} />
  );
}

export default PrivateRoute;

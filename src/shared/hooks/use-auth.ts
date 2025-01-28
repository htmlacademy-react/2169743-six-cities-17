import { useMemo } from 'react';
import { useAppSelector } from './use-app-dispatch';
import { AuthStatus } from '@/shared/constants/auth';
import { getUserAuthStatus } from '@/entities/User/model/user.selector';

function useAuth() {
  const authStatus = useAppSelector(getUserAuthStatus);

  const isAuth = useMemo(
    () => authStatus === AuthStatus.Auth,
    [authStatus],
  );

  return {
    isAuth,
  };
}

export default useAuth;

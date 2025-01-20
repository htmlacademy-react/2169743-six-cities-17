import { useMemo } from 'react';
import { useAppSelector } from './use-app-dispatch';
import { AUTH_STATUS } from '@/shared/constants/auth';
import { getUserAuthStatus } from '@/entities/User/model/user.selector';

function useAuth() {
  const authStatus = useAppSelector(getUserAuthStatus);

  const isAuth = useMemo(
    () => authStatus === AUTH_STATUS.auth,
    [authStatus],
  );

  return {
    isAuth,
  };
}

export default useAuth;

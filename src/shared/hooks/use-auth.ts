import { useMemo } from 'react';
import { useAppSelector } from './use-app-dispatch';
import { AUTH_STATUS } from '@/shared/constants/auth';

function useAuth() {
  const authStatus = useAppSelector((state) => state.authStatus);

  const isAuth = useMemo(
    () => authStatus === AUTH_STATUS.auth,
    [authStatus],
  );

  return {
    isAuth,
  };
}

export default useAuth;

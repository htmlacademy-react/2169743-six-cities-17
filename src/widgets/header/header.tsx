import type { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { logoutUserAction } from '@/store/api-actions';

import LogoLink from '@/shared/components/logo-link/logo-link';
import useAuth from '@/shared/hooks/use-auth';
import { PAGE_PATH } from '@/shared/constants/page-path';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';

function Header() {
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const profile = useAppSelector((state) => state.user.profile);
  const dispatch = useAppDispatch();

  const handleUserLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutUserAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoLink width="81" height="41" />
          </div>

          {pathname !== PAGE_PATH.login && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link to={PAGE_PATH.favorites} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{profile?.email}</span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={(e) => handleUserLogout(e)}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link to={PAGE_PATH.login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

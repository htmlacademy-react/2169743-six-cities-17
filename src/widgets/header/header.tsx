import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import LogoLink from '@/shared/components/logo-link/logo-link';
import useAuth from '@/shared/hooks/use-auth';
import { PagePath } from '@/shared/constants/page-path';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getUserData, getUserFavorites } from '@/entities/User/model/user.selector';
import { logoutUserAction } from '@/entities/User/model/user.api';
import { fetchOffersAction } from '@/entities/Offer/model/offer.api';

function Header() {
  const { isAuth } = useAuth();
  const profile = useAppSelector(getUserData);
  const favorites = useAppSelector(getUserFavorites);
  const dispatch = useAppDispatch();

  const handleUserLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(logoutUserAction())
      .unwrap()
      .then(() => dispatch(fetchOffersAction()))
      .catch(() => {});
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoLink width="81" height="41" />
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                <>
                  <li className="header__nav-item user">
                    <Link to={PagePath.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{profile?.email}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleUserLogout}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link to={PagePath.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

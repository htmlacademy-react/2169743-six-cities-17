import { useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import type { AuthPayload } from './types';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { fetchFavoritesOffersAction, loginUserAction } from '@/entities/User/model/user.api';
import { fetchOffersAction } from '@/entities/Offer/model/offer.api';
import { valueRegex } from '@/shared/utils/validators/value-regex';

function AuthForm() {
  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState<AuthPayload>({
    email: '',
    password: '',
  });

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setAuthData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleLoginSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (valueRegex(authData.email, 'Email') && valueRegex(authData.password, 'Password')) {
      dispatch(loginUserAction(authData))
        .unwrap()
        .then(() => {
          dispatch(fetchOffersAction());
          dispatch(fetchFavoritesOffersAction());
        })
        .catch(() => {});
    } else {
      toast.warn('Invalid form data');
    }
  };

  return (
    <form className="login__form form" onSubmit={handleLoginSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">
          E-mail
        </label>

        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChangeInput}
        />
      </div>

      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">
          Password
        </label>

        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChangeInput}
        />
      </div>

      <button
        className="login__submit form__submit button"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}

export default AuthForm;

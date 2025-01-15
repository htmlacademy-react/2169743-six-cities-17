import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { AuthPayload } from './types';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { loginUserAction } from '@/store/api-actions';

function AuthForm() {
  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState<AuthPayload>({
    email: '',
    password: '',
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuthData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAction(authData));
  };

  return (
    <form className="login__form form" onSubmit={(e) => handleLoginSubmit(e)}>
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
          onChange={(e) => handleChangeInput(e)}
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
          onChange={(e) => handleChangeInput(e)}
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

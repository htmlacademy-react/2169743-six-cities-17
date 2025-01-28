import { Link, Navigate } from 'react-router-dom';
import useAuth from '@/shared/hooks/use-auth';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import AuthForm from '@/features/auth-form/auth-form';
import { CITIES } from '@/widgets/locations/constants/cities';
import { setCity } from '@/widgets/cities/model/cities.slice';

function LoginPage() {
  const { isAuth } = useAuth();

  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];

  const dispatch = useAppDispatch();
  const handleClickCityLink = () => dispatch(setCity({ city: randomCity }));

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <AuthForm />
      </section>

      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <Link
            to="/"
            className="locations__item-link"
            onClick={handleClickCityLink}
          >
            <span>{randomCity}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

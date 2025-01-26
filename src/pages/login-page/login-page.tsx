import { Navigate } from 'react-router-dom';
import AuthForm from '@/features/auth-form/auth-form';
import useAuth from '@/shared/hooks/use-auth';

function LoginPage() {
  const { isAuth } = useAuth();

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
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

import { Link } from 'react-router-dom';
import { PageRoute } from '@/shared/constants/page-path';

type ErrorPageProps = {
  code?: number;
  description?: string;
};

function ErrorPage({ code = 404, description = 'Page not found' }: ErrorPageProps) {
  return (
    <div className="container">
      <h1>{code}</h1>
      <p>{description}</p>
      <Link to={PageRoute.Main}>Back to home</Link>
    </div>
  );
}

export default ErrorPage;

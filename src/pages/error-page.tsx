import { Link } from 'react-router-dom';
import { PAGE_ROUTE } from '@/shared/constants/page-path';

type ErrorPageProps = {
  code?: number;
  description?: string;
};

function ErrorPage({ code = 404, description = 'Page not found' }: ErrorPageProps) {
  return (
    <div className="container">
      <h1>{code}</h1>
      <p>{description}</p>
      <Link to={PAGE_ROUTE.main}>Back to home</Link>
    </div>
  );
}

export default ErrorPage;

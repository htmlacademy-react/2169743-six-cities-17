import { Link } from 'react-router-dom';

type ErrorPageProps = {
  code?: number;
  description?: string;
};

function ErrorPage({ code = 404, description = 'Page not found' }: ErrorPageProps) {
  return (
    <div className="container">
      <h1>{code}</h1>
      <p>{description}</p>
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default ErrorPage;

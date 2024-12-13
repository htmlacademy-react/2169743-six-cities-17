import { Link } from 'react-router-dom';
import classNames from 'classnames';

type LogoLinkProps = {
  type?: 'header' | 'footer';
  width: string;
  height: string;
};

function LogoLink({ type = 'header', ...props }: LogoLinkProps) {
  const logoClassName = classNames(`${type}__logo-link`, {
    'header__logo-link--active': type === 'header',
  });

  return (
    <Link to="/" className={logoClassName}>
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        {...props}
      />
    </Link>
  );
}

export default LogoLink;

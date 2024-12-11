import { Outlet } from 'react-router-dom';
import Header from '@/components/header/header';

// TODO: динамический modificator <main> + .page
function Layout() {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <Outlet />
      </main>

      {/* TODO: footer для favorites-page */}
    </div>
  );
}

export default Layout;

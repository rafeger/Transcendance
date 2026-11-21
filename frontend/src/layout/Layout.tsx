import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout() {
  return (
    // bg-bg / text-fg : couleurs du thème clair/sombre (variables de index.css)
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  sidebar?: React.ReactNode;
}

export default function Layout({ sidebar }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {sidebar ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
            <div className="flex gap-8">
              {sidebar}
              <div className="flex-1 min-w-0">
                <Outlet />
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

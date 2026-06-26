import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ClimateProvider } from '@/context/ClimateContext';
import { Toaster } from '@/components/ui/toaster';

export function Layout() {
  return (
    <ClimateProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ClimateProvider>
  );
}

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AppContextProvider } from '../context/appContext';
import AuthWrapper from '../components/AuthWrapper';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <AppContextProvider>
        <div className="flex flex-col h-screen">
          {/* Header - на всю ширину экрана */}
          <Header />
          {/* Main Layout - Sidebar + Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className="flex flex-col w-full overflow-y-scroll">
              {/* Page Content */}
              <div className="px-8 py-4 bg-gray-300">
                <div className="mx-auto">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </AppContextProvider>
    </AuthWrapper>
  );
}

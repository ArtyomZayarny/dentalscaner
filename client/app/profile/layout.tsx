import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { AppContextProvider } from '../context/appContext';
import AuthWrapper from '../components/AuthWrapper';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <AppContextProvider>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="flex flex-col w-full overflow-y-scroll">
            <Topbar />
            {/* Page Content */}
            <div className="px-8 py-4 bg-white">
              <div className="mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </AppContextProvider>
    </AuthWrapper>
  );
}

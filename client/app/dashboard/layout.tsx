import MobileLayout from '../components/MobileLayout';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileLayout>{children}</MobileLayout>;
}

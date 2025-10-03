import MobileLayout from '../components/MobileLayout';

export default function AppointmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileLayout>{children}</MobileLayout>;
}

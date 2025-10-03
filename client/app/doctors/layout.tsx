import MobileLayout from '../components/MobileLayout';

export default function DoctorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileLayout>{children}</MobileLayout>;
}

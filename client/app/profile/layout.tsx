import MobileLayout from '../components/MobileLayout';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileLayout>{children}</MobileLayout>;
}

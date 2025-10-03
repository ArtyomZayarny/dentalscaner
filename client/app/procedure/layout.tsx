import MobileLayout from '../components/MobileLayout';

export default function ProcedureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileLayout>{children}</MobileLayout>;
}

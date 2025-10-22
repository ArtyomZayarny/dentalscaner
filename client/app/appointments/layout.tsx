export default function AppointmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Временно убираем MobileLayout для диагностики
  // Если страница начнет рендериться, проблема в MobileLayout
  return <>{children}</>;
}

import React from 'react';

function Section({
  children,
  title,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="px-6 py-8 border border-[#ECEFF2] rounded-md flex flex-col gap-8 bg-[#fff]">
      <h3 className="text-[#101828] font-medium text-2xl">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default Section;

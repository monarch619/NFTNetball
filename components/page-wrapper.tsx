import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-w-screen flex-col items-center justify-center pb-[4rem]">
        {children}
      </main>
    </>
  );
}

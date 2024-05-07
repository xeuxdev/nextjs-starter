import React from "react";
// import DashboardHeader from "./_components/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="pt-16 container">{children}</main>
    </>
  );
}

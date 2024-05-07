import { Icons } from "@/components/ui/icons";
import { getUserAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { getUserInfo } from "./_data-access/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getUserAuth();
  const user = await getUserInfo(session?.user.id);
  if (session && user?.user_name !== undefined) {
    redirect(`/${user.user_name}`);
  }

  return (
    <>
      <header className="fixed h-16 top-0 left-0 w-full bg-background border-b z-50">
        <div className="container flex items-center h-full">
          <Icons.logo />
        </div>
      </header>
      <main className="container flex items-center justify-center py-20 min-h-screen max-w-lg">
        {children}
      </main>
    </>
  );
}

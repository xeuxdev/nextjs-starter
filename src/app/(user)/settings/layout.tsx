import { checkAuth } from "@/lib/auth";
import React from "react";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-5 gap-10 pt-10">
        {/* <Suspense>
          <SideBar routes={siteConfig.navigations.settings} />
        </Suspense>
        <div className="col-span-5 lg:col-span-4">{children}</div> */}
      </div>
    </div>
  );
}

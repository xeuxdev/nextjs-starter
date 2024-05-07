"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Mobile() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Icons.menu />
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>
            <Icons.logo />
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-10 py-20">
          <div className=" gap-4 flex flex-col">
            {siteConfig.navigations.lobby.map((nav) => (
              <Link
                href={nav.href}
                key={nav.name}
                onClick={() => setOpen(false)}
              >
                {nav.name}
              </Link>
            ))}
          </div>

          <Button asChild className="w-full" onClick={() => setOpen(false)}>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

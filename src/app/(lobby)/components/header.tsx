import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import Mobile from "./mobile";

export default async function Header() {
  // const user = await getUserById();

  return (
    <header className="w-full h-16 flex items-center justify-center border-b border-muted fixed top-0 left-0 z-50 bg-background">
      <nav className="flex items-center justify-between w-full container">
        <Icons.logo />
        <>
          <div className="items-center gap-8 hidden md:flex">
            {siteConfig.navigations.lobby.map((nav) => (
              <Link
                href={nav.href}
                key={nav.name}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {nav.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* {user ? (
              <AuthUserDropdown user={user} />
            ) : (
              <>
                <Button asChild className="hidden md:flex">
                  <Link href={"/login"}>Login</Link>
                </Button>
                <Mobile />
              </>
            )} */}
                <Button asChild className="hidden md:flex">
                  <Link href={"/login"}>Login</Link>
                </Button>
                <Mobile />

          </div>
          
        </>
      </nav>
    </header>
  );
}

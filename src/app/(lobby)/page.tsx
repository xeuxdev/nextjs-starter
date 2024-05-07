import { Boxes } from "@/components/ui/backgrounds";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: `${siteConfig.name}`,
  description: `${siteConfig.description}`,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${siteConfig.name}`,
    description: `${siteConfig.description}`,
    url: `${siteConfig.url}`,
    siteName: `${siteConfig.name}`,
    images: [
      {
        url: `/logo.png`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  metadataBase: new URL(`${siteConfig.url}`),
};

export default function Home() {
  return (
    <>
      <section className="text-white py-16 px-4 relative mb-16 sm:mb-20 md:mb-24">
        <Boxes />
        <div className="container flex flex-col items-center">
          <div className="w-full max-w-[600px] text-center">
            <h1 className="text-2xl md:text-4xl text-primary lg:text-6xl font-bold mb-4 text-balance">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero,
              blanditiis.
            </h1>
            <p className="mb-6 text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              eius aliquam laudantium quos? Temporibus cupiditate quo voluptatum
              excepturi deserunt ad possimus ex itaque vero dignissimos
              voluptatibus tenetur eligendi iste, sit blanditiis porro vitae
              accusamus quaerat? Fugiat, voluptatibus. Maiores, animi sint!{" "}
            </p>
            <Button asChild>
              <Link href="/reviews">Lorem, ipsum.</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="categories">
        <div className="container mb-16 sm:mb-20 md:mb-24">
          <div className="w-full text-center">
            <h2 className="text-xl md:text-3xl text-primary lg:text-4xl font-bold mb-4 text-balance">
              Categories
            </h2>
            <p className="mb-6 text-muted-foreground">Template</p>
          </div>
        </div>
      </section>
    </>
  );
}

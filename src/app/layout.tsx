import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/lib/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: `${siteConfig.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

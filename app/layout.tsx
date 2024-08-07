import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Database",
  description:
    "A Great website to manage and store your finances and for budgeting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js" />
      </body>
    </html>
  );
}

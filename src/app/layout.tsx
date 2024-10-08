import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";
import { Theme } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News feed",
  description: "News feed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Theme>{children}</Theme>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

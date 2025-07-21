import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local"
import ConvexClientProvider from "@/components/providers/convex-client-provider";

const myFont = localFont({
  src: '/Satoshi-Regular.woff2',
  fallback: ["sans-serif"]
})

export const metadata: Metadata = {
  title: "Codura",
  description: "Write beautiful code in this IDE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={myFont.className}>
        <body>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}

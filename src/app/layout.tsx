import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local"
import ConvexClientProvider from "@/components/providers/convex-client-provider";
import Footer from "@/components/footer";

const myFont = localFont({
  src: '/Satoshi-Regular.woff2',
  fallback: ["sans-serif"],
  variable: '--font-satoshi'
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
      <html lang="en" className={`${myFont.variable} ${myFont.className}`}>
        <body className="min-h-screen flex flex-col">
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

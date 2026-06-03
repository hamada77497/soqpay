import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoqPay - Pi Marketplace",
  description: "A decentralized marketplace on Pi Network",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            font-sans: ${GeistSans.variable};
            font-mono: ${GeistMono.variable};
          }
        `}</style>
        {/* Pi Network SDK - Required for authentication and payments */}
        <script src="https://sdk.minepi.com/pi-sdk.js" async></script>
        <script>
          {`
            window.piInitialized = false;
            window.addEventListener('load', function() {
              if (window.Pi && !window.piInitialized) {
                window.piInitialized = true;
                window.Pi.init({ version: '2.0', sandbox: true });
                console.log('Pi SDK initialized from layout');
              }
            });
          `}
        </script>
      </head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

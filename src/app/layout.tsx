import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Hearth & Harbor Inn",
    template: "%s · Hearth & Harbor",
  },
  description:
    "A coastal inn on Cape Meridian. Book a room, dine at the Tide Table, and rest beside the Atlantic.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

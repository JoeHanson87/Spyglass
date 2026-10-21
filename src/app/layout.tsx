import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Cinzel({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-serif" });
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-body" });

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Spyglass & Kettle | Pub & Restaurant, Kent", template: "%s | Spyglass & Kettle" },
  description: "Spyglass & Kettle: traditional pub and restaurant in Kent. Good food, great drinks, live music, events and a warm welcome.",
  openGraph: { type: "website", locale: "en_GB", siteName: "Spyglass & Kettle", images: ["/images/pub.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${serif.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

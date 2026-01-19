import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OFHM | Our Father Home Ministries",
    template: "%s | OFHM"
  },
  description: "Official presence of Our Father Home Ministries. Dedicated to serving orphans, widows, and the poor through Christ-centered care and community empowerment since 2010.",
  keywords: ["OFHM", "Our Father Home Ministries", "NGO India", "Orphanage India", "Widow Ministry", "Church Planting", "Gandham Buli Veerraju"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ofhm.org",
    siteName: "Our Father Home Ministries",
    images: [{
      url: "/images/founder.jpg",
      width: 1200,
      height: 630,
      alt: "OFHM Founder Pastor Gandham Buli Veerraju"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OFHM | Our Father Home Ministries",
    description: "Serving the least, the last, and the lost in India.",
    images: ["/images/founder.jpg"]
  },
  icons: {
    icon: [
      { url: "/branding/ofhm-logo-mark.png", sizes: "32x32", type: "image/png" },
      { url: "/branding/ofhm-logo-mark.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/branding/ofhm-logo-mark.png", sizes: "180x180", type: "image/png" },
    ],
  }
};

import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    await dbConnect();
    settings = await SiteSettings.findOne({});
  } catch (error) {
    console.error("Database connection error in RootLayout:", error);
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${crimsonPro.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}

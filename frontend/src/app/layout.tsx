import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "../config";

import "./global.css";
import "@coinbase/onchainkit/styles.css";
import dynamic from "next/dynamic";
import Navbar from "src/components/header/navbar";
import Footer from "src/components/footer/footer";
import { Toaster } from "sonner";

const OnchainProviders = dynamic(
  () => import("src/components/OnchainProviders"),
  {
    ssr: false,
  }
);

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Hunch",
  description: "",
  openGraph: {
    title: "Hunch",
    description: "",
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-inter">
        <OnchainProviders>
          <Navbar />
          <div className="">{children}</div>
          <Footer />
          <Toaster position="bottom-right" />
        </OnchainProviders>
      </body>
    </html>
  );
}

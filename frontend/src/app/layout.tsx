import type { Metadata } from "next";
import "./global.css";
import Navbar from "../components/header/navbar";
import Footer from "../components/footer/footer";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import ogImage from "./opengraph-image.png";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Hunch",
  description: "Monetise your social virality on your own terms",
  openGraph: {
    title: "Hunch",
    description: "Monetise your social virality on your own terms",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "Hunch - Monetise your social virality"
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hunch",
    description: "Monetise your social virality on your own terms",
    images: [ogImage.src],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueUltraLight.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueThin.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueLight.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueRoman.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueMedium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueBold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueHeavy.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNeueBlack.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="2bf534ac-d2a8-495c-ba24-4e9cf75aa315"
        ></script>
      </head>
      <body className="bg-[#111015] text-white font-helvetica">
        <Providers>
          <Navbar />
          <div className="">{children}</div>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}

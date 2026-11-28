import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceWidget from "@/components/VoiceWidget";
import GoogleTranslate from "@/components/GoogleTranslate";
import TranslateDomGuard from "@/components/TranslateDomGuard";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <TranslateDomGuard />
        <div suppressHydrationWarning>
          {/* <GoogleTranslate /> */}
        </div>
        <Navbar />
        <div id="page-content">{children}</div>
        <Footer />
        <VoiceWidget />
      </body>
    </html>
  );
}
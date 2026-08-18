import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceWidget from "@/components/VoiceWidget";
import GoogleTranslate from "@/components/GoogleTranslate";
import TranslateDomGuard from "@/components/TranslateDomGuard";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
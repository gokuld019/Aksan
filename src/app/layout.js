import "./globals.css";
import { Noto_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceWidget from "@/components/VoiceWidget";
import GoogleTranslate from "@/components/GoogleTranslate";
import TranslateDomGuard from "@/components/TranslateDomGuard";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={notoSans.variable}>
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
"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceWidget from "@/components/VoiceWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div id="page-content">{children}</div>
        <Footer />
        <VoiceWidget />
      </body>
    </html>
  );
}
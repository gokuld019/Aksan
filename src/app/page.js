import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrackRecord from "@/components/TrackRecord"
import AboutAksan from "@/components/About";
import WhyAksan from "@/components/why";
import BoardOfDirectors from "@/components/Directors";
import MarketInsights from "@/components/Insights";
import PartnersAndTestimonial from "@/components/Partners";
import OurProcess from "@/components/Ourprocess";
import OurPhilosophy from "@/components/Philosophy";
import FAQSection from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <TrackRecord />
      <AboutAksan />
      <WhyAksan />
      <BoardOfDirectors />
      <MarketInsights />
      <PartnersAndTestimonial /> 
      <OurProcess />
      <OurPhilosophy />
      <FAQSection />
    </main>
  );
}
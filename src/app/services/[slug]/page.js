import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { coreServices } from "@/app/data/services";

export function generateStaticParams() {
  return coreServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = coreServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | AKSAN Capital Advisory`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = coreServices.find((s) => s.slug === slug);
  if (!service) return notFound();

  const banner = service.banner || {};
  const isAIFCompliance = slug === "aif-compliances";

  return (
    <main className="bg-white min-h-screen" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      
      {/* --- DYNAMIC HERO BANNER --- */}
      <section className="relative w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[480px] flex items-center overflow-hidden">
        <Image
          src={banner.image || "/HomeBanner.png"}
          alt={`AKSAN ${service.title} — ${banner.subtitle || "Service banner"}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/85 to-[#0b1a3a]/20" />

<div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 pb-12 sm:pb-16">
            <div className="max-w-2xl">
            <span className="text-orange-500 font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              {banner.tag || "Our Services"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white leading-[1.08] mb-4">
              {banner.title || service.title}
            </h1>
            <span className="block h-1 w-14 bg-orange-500 rounded-full mb-5" />
            <p className="text-sm sm:text-[15px] text-slate-300/90 leading-relaxed max-w-xl">
              {banner.subtitle || service.heroSubtitle || service.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION WITH ADJUSTED IMAGE FOR AIF COMPLIANCES --- */}
      {service.intro ? (
        <section className="w-full bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-5xl mx-auto grid ${isAIFCompliance ? 'md:grid-cols-[150px_1fr]' : 'md:grid-cols-2'} gap-10 items-start`}>
  <div
    className={`relative rounded-xl overflow-hidden ${
      isAIFCompliance
        ? "w-full max-w-[150px] h-[600px] sm:h-[750px] md:h-[900px] lg:h-[1000px] mx-auto"
        : "w-full h-[420px] sm:h-[600px]"
    }`}
  >
              <Image
                src={service.intro.image}
                alt={service.intro.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#152249] mb-4">
                {service.intro.title}
              </h2>
              <div className="space-y-4 mb-6">
                {service.intro.paragraphs.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {service.intro.checklist && (
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {service.intro.checklist.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700 py-1.5 border-b border-gray-100"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-orange-500 shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full bg-white pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto" />
        </section>
      )}

      {service.highlights && (
        <section className="w-full bg-white pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div className="relative w-full h-[420px] sm:h-[620px] rounded-xl overflow-hidden">
              <Image
                src={service.highlights.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-6">
              {service.highlights.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 shrink-0">
                      <Icon size={18} className="text-white" strokeWidth={2} />
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {service.serviceGrid && (
        <section className="w-full bg-white pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#152249] mb-3">
                {service.serviceGrid.title}
              </h2>
              <span className="block h-1 w-14 bg-orange-500 mx-auto rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {service.serviceGrid.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 shrink-0">
                      <Icon size={18} className="text-[#152249]" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium text-gray-700 leading-snug">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {service.subServices && service.subServices.length > 0 && (
        <section className="w-full bg-white pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-16">
              {service.subServices.map((sub, index) => {
                const imageFirst = index % 2 === 0;
                return (
                  <div
                    key={sub.title}
                    className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                  >
                    <div
                      className={`relative w-full h-[220px] sm:h-[280px] rounded-xl overflow-hidden ${
                        imageFirst ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <Image
                        src={sub.image}
                        alt={sub.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                      <h3 className="text-xl font-bold text-[#152249] mb-3">
                        {sub.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {sub.description}
                      </p>

                      {sub.bullets && sub.bullets.length > 0 && (
                        <ul className="space-y-2 mb-5">
                          {sub.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {sub.extra && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-5">
                          {sub.extra}
                        </p>
                      )}

                      <a href="#"
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition group"
                      >
                        View Details
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="w-full bg-white pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#152249] hover:text-orange-600 transition"
          >
            <ArrowLeft size={16} />
            Back to All Services
          </Link>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="w-full bg-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl min-h-[220px] flex items-center">
            <Image
              src={service.ctaBanner?.image || "/CTA.png"}
              alt="AKSAN"
              fill
              className="object-cover"
            />
            
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6 sm:px-10 py-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-tight mb-2">
                  <span className="text-white">
                    {service.ctaBanner?.title || "Let's Build Your"}
                  </span>{" "}
                  <span className="text-orange-500">
                    {service.ctaBanner?.highlight || "Financial Success Together."}
                  </span>
                </h2>
                <p className="text-sm text-slate-100 leading-relaxed max-w-md">
                  {service.ctaBanner?.subtitle ||
                    "From fundraising to restructuring, we provide the expertise, insights, and execution support you need to grow with confidence."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <a href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-lg transition shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </a>
                
                <a href="/services"
                  className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-lg transition"
                >
                  View All Services
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
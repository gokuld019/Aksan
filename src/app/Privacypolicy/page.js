"use client";

import { Mail, Phone, MapPin } from "lucide-react";

/**
 * PrivacyPolicy
 * -------------------------------------------------------------------------
 * Replicates the AKSAN-style Privacy Policy layout: centered navy title
 * with a short orange underline, an intro paragraph, numbered sections
 * with bullet lists separated by hairline dividers, a contact-details
 * card (email / phone / address), and a "Last Updated" footer line.
 *
 * Drop this in e.g. app/privacy-policy/page.jsx (App Router) and adjust
 * the copy / contact details to match your own.
 * -------------------------------------------------------------------------
 */

const sections = [
  {
    number: 1,
    title: "Information We Collect",
    body: "We collect personal information that you provide to us voluntarily when you:",
    bullets: [
      "Fill out forms on our website",
      "Subscribe to our newsletter or updates",
      "Contact us via email, phone, or other communication channels",
      "Use our services",
    ],
    footer:
      "This information may include your name, email address, phone number, company name, and any other details you choose to provide.",
  },
  {
    number: 2,
    title: "How We Use Your Information",
    body: "We use your personal information for the following purposes:",
    bullets: [
      "To provide and manage our services",
      "To communicate with you regarding updates, services, or inquiries",
      "To improve our website, services, and user experience",
      "To comply with legal obligations and prevent fraud",
    ],
  },
  {
    number: 3,
    title: "Sharing of Information",
    body: "We do not sell or rent your personal information to third parties. We may share your information only with:",
    bullets: [
      "Service providers who assist us in operating our website or delivering services (under confidentiality obligations)",
      "Legal or regulatory authorities when required by law",
      "Business partners, with your consent, where necessary to deliver requested services",
    ],
  },
  {
    number: 4,
    title: "Data Security",
    body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.\nHowever, no method of transmission over the internet is 100% secure.",
  },
  {
    number: 5,
    title: "Your Rights",
    body: "You have the right to:",
    bullets: [
      "Access, update, or correct your personal information",
      "Withdraw consent at any time",
      "Request deletion of your data (subject to legal or contractual obligations)",
    ],
    footer: "To exercise these rights, please contact us using the details provided below.",
  },
  {
    number: 6,
    title: "Cookies and Tracking Technologies",
    body: "Our website may use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies in your browser settings.",
  },
  {
    number: 7,
    title: "Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their privacy policies.",
  },
  {
    number: 8,
    title: "Changes to This Policy",
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised "Last Updated" date.',
  },
];

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "info@aksan.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 93602 67233",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "28/27, Parvathy Apartments, 2nd Floor, Damodaran Street, T.Nagar, Chennai - 600 017, Tamil Nadu, India.",
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 mt-20">
        {/* Heading */}
        <h1 className="text-center text-3xl md:text-[32px] font-bold text-[#132A5C]">
          Privacy Policy
        </h1>
        <div className="mx-auto mt-3 mb-6 h-[3px] w-10 rounded-full bg-[#E8622C]" />

        <p className="text-center text-sm text-[#3A4A6B] leading-relaxed mb-12">
          At AKSAN, we value your trust and are committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, share, and safeguard your data when you interact with us.
        </p>

        {/* Numbered sections */}
        <div>
          {sections.map((section, idx) => (
            <div key={section.number}>
              <div className="py-6">
                <h2 className="text-[15px] font-bold text-[#132A5C] mb-2">
                  {section.number}. {section.title}
                </h2>

                {section.body.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="text-sm text-[#3A4A6B] leading-relaxed mb-2"
                  >
                    {line}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="my-2 space-y-1.5 pl-5">
                    {section.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="list-disc text-sm text-[#3A4A6B] leading-relaxed marker:text-[#3A4A6B]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="text-sm text-[#3A4A6B] leading-relaxed mt-2">
                    {section.footer}
                  </p>
                )}
              </div>

              {idx < sections.length - 1 && (
                <hr className="border-t border-[#E4E8F0]" />
              )}
            </div>
          ))}

          <hr className="border-t border-[#E4E8F0]" />

          {/* Contact Us */}
          <div className="py-6">
            <h2 className="text-[15px] font-bold text-[#132A5C] mb-2">
              9. Contact Us
            </h2>
            <p className="text-sm text-[#3A4A6B] leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy
              or our data practices, please contact us:
            </p>

            <div className="rounded-lg bg-[#F4F6FB] p-5">
              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#132A5C]">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#132A5C]">
                        {label}
                      </p>
                      <p className="text-sm text-[#3A4A6B] leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Last updated */}
        <p className="mt-6 text-xs text-[#8A93A8]">Last Updated: 26 May 2025</p>
      </div>
    </section>
  );
}
"use client";

import { Mail, Phone, MapPin } from "lucide-react";

/**
 * TermsAndConditions
 * -------------------------------------------------------------------------
 * Replicates the AKSAN-style Terms and Conditions layout: centered navy
 * title with a short orange underline, an intro paragraph, numbered
 * sections of plain paragraph copy separated by hairline dividers, a
 * contact-details card (email / phone / address), and a "Last Updated"
 * footer line.
 *
 * Drop this in e.g. app/terms-and-conditions/page.jsx (App Router) and
 * adjust the copy / contact details to match your own.
 * -------------------------------------------------------------------------
 */

const sections = [
  {
    number: 1,
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing this website or using any of our services, you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website or services.",
    ],
  },
  {
    number: 2,
    title: "About AKSAN",
    paragraphs: [
      "AKSAN is engaged in providing equity advisory, capital market, and related financial services. The information provided on this website is for general informational purposes only and does not constitute professional advice or an offer to buy or sell any securities.",
    ],
  },
  {
    number: 3,
    title: "Use of Our Website",
    paragraphs: [
      "You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of or restrict or inhibit anyone else's use and enjoyment of this website. You must not misuse our website by introducing viruses, trojans, or other material that is malicious or technologically harmful.",
    ],
  },
  {
    number: 4,
    title: "Intellectual Property Rights",
    paragraphs: [
      "All content on this website, including text, graphics, logos, icons, images, and software, is the property of AKSAN or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.",
    ],
  },
  {
    number: 5,
    title: "Limitation of Liability",
    paragraphs: [
      'The information on this website is provided on an "as is" and "as available" basis. AKSAN makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.',
      "In no event shall AKSAN be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of our website or services.",
    ],
  },
  {
    number: 6,
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites for your convenience. AKSAN is not responsible for the content, privacy policies, or practices of any third-party websites. We encourage you to read the terms and policies of those websites.",
    ],
  },
  {
    number: 7,
    title: "Governing Law and Jurisdiction",
    paragraphs: [
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in relation to these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai.",
    ],
  },
  {
    number: 8,
    title: "Changes to These Terms",
    paragraphs: [
      "AKSAN reserves the right to update or modify these Terms and Conditions at any time without prior notice. Any changes will be effective immediately upon posting on this website. Your continued use of our website or services after the changes are posted constitutes your acceptance of the revised terms.",
    ],
  },
];

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "compliance@aksan.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 22 6917 8000",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "A-601, One BKC, Bandra Kurla Complex, Bandra (E), Mumbai - 400051, India",
  },
];

export default function TermsAndConditions() {
  return (
    <section className="bg-white py-16 md:py-20 mt-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Heading */}
        <h1 className="text-center text-3xl md:text-[32px] font-bold text-[#132A5C]">
          Terms and Conditions
        </h1>
        <div className="mx-auto mt-3 mb-6 h-[3px] w-10 rounded-full bg-[#E8622C]" />

        <p className="text-center text-sm text-[#3A4A6B] leading-relaxed mb-12">
          Welcome to AKSAN. By accessing or using our website and services,
          you agree to be bound by the following terms and conditions.
          Please read them carefully.
        </p>

        {/* Numbered sections */}
        <div>
          {sections.map((section, idx) => (
            <div key={section.number}>
              <div className="py-6">
                <h2 className="text-[15px] font-bold text-[#132A5C] mb-2">
                  {section.number}. {section.title}
                </h2>

                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm text-[#3A4A6B] leading-relaxed mb-2 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <hr className="border-t border-[#E4E8F0]" />
            </div>
          ))}

          {/* Contact Us */}
          <div className="py-6">
            <h2 className="text-[15px] font-bold text-[#132A5C] mb-2">
              9. Contact Us
            </h2>
            <p className="text-sm text-[#3A4A6B] leading-relaxed mb-4">
              If you have any questions or concerns about these Terms and
              Conditions, please contact us:
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
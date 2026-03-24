import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    paragraphs: [
      "Welcome to Mosa AI.",
      "These Terms & Conditions govern your access to and use of Mosa AI, including our WhatsApp chatbot, website, and related educational services. By using Mosa AI, you agree to be bound by these Terms & Conditions.",
      "If you do not agree to these Terms & Conditions, you must not use Mosa AI.",
    ],
  },
  {
    title: "2. Who We Are",
    paragraphs: [
      "Mosa AI is an educational technology service operated by Andile Masela under the name Mosa AI.",
      "Contact email: maselaandile@gmail.com",
    ],
  },
  {
    title: "3. Governing Law",
    paragraphs: [
      "These Terms & Conditions are governed by the laws of the Republic of South Africa.",
      "Any dispute arising from or relating to these Terms & Conditions, your use of Mosa AI, or any related service will be subject to the applicable laws of South Africa.",
    ],
  },
  {
    title: "4. Eligibility to Use Mosa AI",
    paragraphs: [
      "Mosa AI is intended for educational use by students and other users interested in accessing academic materials and related support services.",
      "By using Mosa AI, you confirm that:",
      "Users who are minors must use the platform in accordance with applicable South African law. Where consent is required from a parent or legal guardian, Mosa AI may require additional consent steps before certain features are enabled, especially where personal information may later be used for referral or lead-sharing purposes.",
    ],
    bullets: [
      "the information you provide is true and accurate to the best of your knowledge;",
      "you are using the service for lawful purposes only; and",
      "you are entitled to provide any personal information you submit to us.",
    ],
  },
  {
    title: "5. Acceptance Before Registration",
    paragraphs: [
      "Acceptance of these Terms & Conditions is required before registration is completed.",
      "You may also be required to review and accept Mosa AI's Privacy Policy before registration or activation of certain services.",
      "Your acceptance may be recorded electronically, including through a checkbox, flow confirmation, or similar digital acceptance mechanism.",
    ],
  },
  {
    title: "6. Services Provided",
    paragraphs: [
      "Mosa AI provides educational support services, including but not limited to:",
      "Some features may be added, removed, suspended, or changed over time.",
    ],
    bullets: [
      "access to past exam papers;",
      "access to memorandums and related academic materials;",
      "study support content;",
      "timetables;",
      "prospectuses;",
      "AI-powered educational assistance;",
      "referral or lead-related opportunities that may be introduced in future.",
    ],
  },
  {
    title: "7. Free Service",
    paragraphs: [
      "Mosa AI is currently offered free of charge to users.",
      "We reserve the right to introduce paid services, premium services, or usage limitations in future. If we do so, this will be communicated separately and, where required, updated terms will apply.",
    ],
  },
  {
    title: "8. Educational Purpose Only",
    paragraphs: [
      "Mosa AI is provided for educational support and informational purposes only.",
      "Mosa AI does not provide legal advice, professional academic counseling, admission guarantees, scholarship guarantees, or any guarantee of educational, commercial, or institutional outcomes.",
    ],
  },
  {
    title: "9. No Guarantee of Availability or Accuracy",
    paragraphs: [
      "While we aim to provide useful, relevant, and accurate educational materials, Mosa AI makes no warranty or guarantee that:",
      "Educational materials, third-party information, and generated responses may sometimes be incomplete, unavailable, delayed, or inaccurate.",
      "You use the platform at your own risk.",
    ],
    bullets: [
      "any document will always be available;",
      "any result returned by the chatbot will always be correct, complete, or current;",
      "the service will operate without interruption, delay, or error; or",
      "the platform will meet every user's expectations or specific needs.",
    ],
  },
  {
    title: "10. Privacy and Personal Information",
    paragraphs: [
      "Your use of Mosa AI is also subject to our Privacy Policy.",
      "Our Privacy Policy explains how we collect, use, store, and protect personal information, including information submitted through WhatsApp, our website, and related registration or service flows.",
      "By using Mosa AI, you acknowledge that your personal information may be processed as reasonably necessary for us to provide the service.",
    ],
  },
  {
    title: "11. Third-Party Sharing and Referrals",
    paragraphs: [
      "Mosa AI does not currently share your personal information with third parties for lead generation, referral distribution, or commercial partner access unless you are clearly informed and have explicitly opted in.",
      "If referral or lead-sharing features are introduced in future:",
    ],
    bullets: [
      "they will be subject to separate and explicit user consent where required;",
      "additional safeguards may apply, especially for minors; and",
      "Mosa AI may require renewed confirmation before sharing any personal information.",
    ],
  },
  {
    title: "12. Acceptable Use",
    paragraphs: [
      "You agree not to use Mosa AI:",
      "We reserve the right to suspend, restrict, or terminate access where we reasonably believe a user has breached these Terms & Conditions or misused the service.",
    ],
    bullets: [
      "for any unlawful, fraudulent, misleading, or abusive purpose;",
      "to harass, threaten, impersonate, or harm any person;",
      "to submit false, misleading, or unauthorized personal information;",
      "to interfere with, disrupt, reverse engineer, probe, or damage the service;",
      "to attempt unauthorized access to our systems, data, or infrastructure;",
      "to use automated means to scrape, overload, or misuse the platform without permission; or",
      "in any way that may damage the reputation, security, operation, or lawful functioning of Mosa AI.",
    ],
  },
  {
    title: "13. User Responsibilities",
    paragraphs: ["You are responsible for:"],
    bullets: [
      "ensuring that the information you provide is accurate;",
      "reviewing documents or outputs before relying on them;",
      "using the platform responsibly; and",
      "complying with applicable laws and regulations when using Mosa AI.",
    ],
  },
  {
    title: "14. Intellectual Property",
    paragraphs: [
      "All rights in the Mosa AI platform, branding, workflows, software, and original content remain the property of Mosa AI or its licensors, unless otherwise stated.",
      "Nothing in these Terms & Conditions transfers ownership of intellectual property to you.",
      "You may use Mosa AI only for its intended educational and lawful purposes.",
    ],
  },
  {
    title: "15. Third-Party Content and Links",
    paragraphs: [
      "Mosa AI may provide links to external websites or third-party resources, including institutions, prospectuses, and other educational sources.",
      "We do not control and are not responsible for the content, availability, privacy practices, or accuracy of third-party websites or services.",
      "Accessing third-party links is at your own risk.",
    ],
  },
  {
    title: "16. Suspension, Changes, and Termination",
    paragraphs: [
      "We may suspend, modify, discontinue, or restrict any part of Mosa AI at any time, with or without notice, where reasonably necessary for maintenance, security, legal compliance, operational reasons, or service improvement.",
      "We may also update these Terms & Conditions from time to time.",
      "The latest version will be made available on our website or through another appropriate channel. Continued use of the service after updates take effect may constitute acceptance of the revised Terms & Conditions.",
    ],
  },
  {
    title: "17. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by applicable law, Mosa AI and its operator will not be liable for any direct, indirect, incidental, consequential, special, or punitive loss or damage arising from or related to:",
      "Nothing in these Terms & Conditions excludes or limits liability where such exclusion or limitation is not permitted under South African law.",
    ],
    bullets: [
      "your use of or inability to use the service;",
      "missing, delayed, or incorrect educational materials;",
      "chatbot responses or recommendations;",
      "service interruption or downtime;",
      "third-party services, links, or content; or",
      "unauthorized access, misuse, or technical failure beyond our reasonable control.",
    ],
  },
  {
    title: "18. POPIA and Data Subject Rights",
    paragraphs: [
      'Where applicable, Mosa AI will process personal information in accordance with the Protection of Personal Information Act, 2013 ("POPIA").',
      "Subject to applicable law, users may have the right to:",
      "To exercise these rights, please contact: maselaandile@gmail.com",
    ],
    bullets: [
      "request access to their personal information;",
      "request correction of inaccurate personal information;",
      "request deletion of personal information where appropriate;",
      "object to certain processing activities; and",
      "withdraw consent where processing is based on consent.",
    ],
  },
  {
    title: "19. Data Deletion",
    paragraphs: [
      "If you want your data removed from Mosa AI, you may request deletion through the mechanisms provided by the platform, including by sending:",
      '"DELETE MY DATA"',
      "where that feature is available.",
      "We may retain limited records where required by law, for legitimate security purposes, to resolve disputes, or to comply with legal obligations.",
    ],
  },
  {
    title: "20. Contact",
    paragraphs: ["If you have any questions about these Terms & Conditions, please contact:"],
  },
  {
    title: "21. Entire Agreement",
    paragraphs: [
      "These Terms & Conditions, together with the Privacy Policy and any other policies or notices expressly incorporated by reference, form the full agreement between you and Mosa AI regarding your use of the service.",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-10 border-b border-slate-200 pb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-whatsapp-dark">
              Legal
            </p>
            <h1 className="mb-4 text-3xl font-heading font-bold text-tutoring-blue md:text-5xl">
              Mosa AI Terms &amp; Conditions
            </h1>
            <p className="text-base text-slate-600">
              Effective date: March 17, 2026
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 text-2xl font-heading font-semibold text-slate-900">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base leading-7 text-slate-700">
                  {section.paragraphs?.map((paragraph) => {
                    if (paragraph === '"DELETE MY DATA"') {
                      return (
                        <p key={paragraph}>
                          <code className="rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-900">
                            DELETE MY DATA
                          </code>
                        </p>
                      );
                    }

                    if (paragraph.includes("maselaandile@gmail.com")) {
                      const [before, after] = paragraph.split(
                        "maselaandile@gmail.com"
                      );

                      return (
                        <p key={paragraph}>
                          {before}
                          <a
                            className="font-medium text-tutoring-blue underline underline-offset-4"
                            href="mailto:maselaandile@gmail.com"
                          >
                            maselaandile@gmail.com
                          </a>
                          {after}
                        </p>
                      );
                    }

                    return <p key={paragraph}>{paragraph}</p>;
                  })}
                </div>

                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.title === "20. Contact" && (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
                    <p className="font-semibold text-slate-900">Mosa AI</p>
                    <p>
                      Email:{" "}
                      <a
                        className="font-medium text-tutoring-blue underline underline-offset-4"
                        href="mailto:maselaandile@gmail.com"
                      >
                        maselaandile@gmail.com
                      </a>
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;

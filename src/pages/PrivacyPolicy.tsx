
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileCheck, Clock, Server } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-tutoring-blue">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">Last updated: April 12, 2025</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <Shield className="h-8 w-8 text-tutoring-purple mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Data Protection</h3>
              <p className="text-gray-600 text-sm">We implement industry-standard security measures to protect your personal information.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <Lock className="h-8 w-8 text-whatsapp mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600 text-sm">Your WhatsApp messages with our tutors remain end-to-end encrypted at all times.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <Eye className="h-8 w-8 text-tutoring-orange mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">We're committed to being clear about what data we collect and how we use it.</p>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-700">
              At WhatsApp Tutor ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our tutoring services via WhatsApp.
            </p>
            <p className="mb-4 text-gray-700">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">2. Information We Collect</h2>
            <div className="mb-6">
              <h3 className="text-xl font-heading font-medium mb-3 text-tutoring-blue">2.1 Personal Information</h3>
              <p className="mb-3 text-gray-700">
                We may collect personal information that you voluntarily provide when using our services, including:
              </p>
              <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-2">
                <li>Full name</li>
                <li>Contact information (email address, phone number)</li>
                <li>Educational background</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-heading font-medium mb-3 text-tutoring-blue">2.2 WhatsApp Communication Data</h3>
              <p className="mb-3 text-gray-700">
                When you interact with our tutors through WhatsApp, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-2">
                <li>Message content related to tutoring sessions</li>
                <li>Files, images, and documents you share for educational purposes</li>
                <li>Session timing and frequency</li>
              </ul>
              <p className="text-gray-700">
                Please note that WhatsApp's end-to-end encryption ensures that only you and our tutors can read the messages exchanged.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">3. How We Use Your Information</h2>
            <div className="flex items-start mb-4">
              <FileCheck className="h-5 w-5 text-whatsapp mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">To provide, maintain, and improve our tutoring services</p>
            </div>
            <div className="flex items-start mb-4">
              <FileCheck className="h-5 w-5 text-whatsapp mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">To process payments and prevent fraudulent transactions</p>
            </div>
            <div className="flex items-start mb-4">
              <FileCheck className="h-5 w-5 text-whatsapp mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">To match you with appropriate tutors based on your educational needs</p>
            </div>
            <div className="flex items-start mb-4">
              <FileCheck className="h-5 w-5 text-whatsapp mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">To send you service-related notifications and updates</p>
            </div>
            <div className="flex items-start mb-4">
              <FileCheck className="h-5 w-5 text-whatsapp mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">To analyze usage patterns and improve our educational content</p>
            </div>
            <div className="flex items-start mb-4">
              <FileCheck className="h-5 w-5 text-whatsapp mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700">To respond to your inquiries and provide customer support</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">4. Data Retention</h2>
            <div className="flex items-start mb-6">
              <Clock className="h-6 w-6 text-tutoring-blue mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="mb-3 text-gray-700">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p className="text-gray-700">
                  WhatsApp messages exchanged during tutoring sessions may be retained for quality assurance and educational improvement purposes for up to 12 months after your last session.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4 text-gray-700">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Right to access the personal information we hold about you</li>
              <li>Right to request correction of inaccurate data</li>
              <li>Right to request deletion of your data</li>
              <li>Right to restrict or object to processing of your data</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="text-gray-700">
              To exercise any of these rights, please contact us at privacy@whatsapptutor.com.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">6. Data Security</h2>
            <div className="flex items-start mb-6">
              <Server className="h-6 w-6 text-tutoring-purple mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="mb-3 text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, or destruction.
                </p>
                <p className="text-gray-700">
                  While we strive to protect your personal information, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">7. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-gray-700">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this Privacy Policy.
            </p>
            <p className="text-gray-700">
              We encourage you to review this Privacy Policy frequently to stay informed about how we are protecting your information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">8. Contact Us</h2>
            <p className="mb-4 text-gray-700">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-800">WhatsApp Tutor</p>
              <p className="text-gray-700">Email: privacy@whatsapptutor.com</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-700">Address: 123 Education Lane, Learning City, 12345</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

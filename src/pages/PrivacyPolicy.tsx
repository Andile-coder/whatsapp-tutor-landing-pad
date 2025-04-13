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

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              1. Who We Are
            </h2>
            <p className="text-gray-700 mb-4">
              This Privacy Policy applies to Mosa AI, a WhatsApp chatbot
              designed to help students access Grade 11 and 12 educational
              materials including past papers, memos, and more.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              When you use our chatbot on WhatsApp, we collect your WhatsApp{" "}
              <strong>username</strong> and <strong>phone number</strong>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Send educational documents directly to your WhatsApp account.
              </li>
              <li>
                Retrieve previous conversations to improve your experience.
              </li>
              <li>Track usage metrics and monitor abuse of the service.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              4. Access to Information
            </h2>
            <p className="text-gray-700">
              Your personal information is accessible only to authorized
              personnel within our organization. We do not sell or share your
              information with any third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              5. Data Retention & Deletion
            </h2>
            <p className="text-gray-700 mb-4">
              If you wish to delete your data, you may send the message{" "}
              <strong>"DELETE MY DATA"</strong> to our WhatsApp bot. Upon
              receiving this, we will remove your personal information from our
              systems.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              6. Security
            </h2>
            <p className="text-gray-700 mb-4">
              We take your data seriously and use industry-standard measures to
              protect it from unauthorized access or misuse.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">
              7. Contact Us
            </h2>
            <p className="mb-4 text-gray-700">
              If you have any questions about this privacy policy, you can
              contact us via WhatsApp or email at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-800">Mosa AI</p>
              <p className="text-gray-700">
                Email:{" "}
                <a href="mailto:maselaandile+12@gmail.com">
                  maselaandile+12@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

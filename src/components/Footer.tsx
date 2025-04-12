import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-whatsapp flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">MA</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Mosa<span className="text-whatsapp">AI</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming how students get academic help through the
              convenience of WhatsApp.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#subjects"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Subjects
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Subjects</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mathematics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Physics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chemistry
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  English
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Computer Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SAT/ACT Prep
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <MessageCircle size={16} className="mr-2 text-whatsapp" />
                WhatsApp: +27 64 684 8143
              </li>
              <li>Email: maselaandile@gmail.com</li>
              <li>Hours: 24/7, 365 days a year</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-whatsapp text-white rounded hover:bg-whatsapp-dark transition-colors text-sm">
              Chat with Support
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Mosa. All rights reserved.
            </div>
            <div className="flex space-x-4">
<<<<<<< HEAD
              <a href="/policy" className="hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-300">
                Cookie Policy
              </a>
=======
              <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Cookie Policy</a>
>>>>>>> 4a255e23741091eb86220b2a4b8eaf5f556c803c
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

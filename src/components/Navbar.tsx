import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const message = "Hi Mosa!";
  const phoneNumber = "27725540603"; // Use your WhatsApp number with country code

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-whatsapp flex items-center justify-center">
              <span className="text-white font-bold text-xl">MA</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:inline-block">
              Mosa<span className="text-whatsapp">AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/#how-it-works"
            className="text-sm font-medium hover:text-whatsapp transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#subjects"
            className="text-sm font-medium hover:text-whatsapp transition-colors"
          >
            Subjects
          </a>
          <a
            href="/#faq"
            className="text-sm font-medium hover:text-whatsapp transition-colors"
          >
            FAQ
          </a>
          <Link
            to="/feedback"
            className="text-sm font-medium hover:text-whatsapp transition-colors"
          >
            Feedback
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button
            className="bg-whatsapp hover:bg-whatsapp-dark text-white"
            onClick={handleWhatsAppClick}
          >
            Start Learning
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-whatsapp transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#subjects"
              className="text-sm font-medium hover:text-whatsapp transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Subjects
            </a>
            <a
              href="#faq"
              className="text-sm font-medium hover:text-whatsapp transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Link
              to="/feedback"
              className="text-sm font-medium hover:text-whatsapp transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Feedback
            </Link>
            <Button
              className="bg-whatsapp hover:bg-whatsapp-dark text-white w-full"
              onClick={handleWhatsAppClick}
            >
              Start Learning
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

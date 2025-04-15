import { Button } from "@/components/ui/button";
import { Smartphone, UserCheck, MessageCircle, ThumbsUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="h-8 w-8 text-white" />,
      title: "Send us a message",
      description: "Message our WhatsApp number and request for the document .",
      color: "bg-tutoring-blue",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: "Get Registered on our platform",
      description:
        "Instantly get registered on our platform and start your journey.",
      color: "bg-tutoring-purple",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      title: "Download or chat",
      description:
        "Request the document you need and download it directly from WhatsApp.",
      color: "bg-whatsapp",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-white" />,
      title: "Learn and succeed",
      description: "Use the document to ace your exams and achieve your goals.",
      color: "bg-tutoring-orange",
    },
  ];

  const message = "Hi Mosa!";
  const phoneNumber = "27725540603"; // Use your WhatsApp number with country code

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting access to academic documents has never been simpler. Our
            simple process brings you all the documents you need in one app.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connection line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-5`}
                >
                  {step.icon}
                </div>
                <div className="bg-white md:h-full">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-whatsapp hover:bg-whatsapp-dark text-white font-medium"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Start Learning Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

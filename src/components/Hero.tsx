import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left content */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight">
              High School Assistance
              <span className="text-whatsapp block">
                Delivered via WhatsApp
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-xl">
              Get instant question papers, memorandums study guides and
              textbooks for all subjects. Simple. Convenient. Effective.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-whatsapp mr-2 mt-1 flex-shrink-0" />
                <p>Download question papers in seconds.</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-whatsapp mr-2 mt-1 flex-shrink-0" />
                <p>Available 24/7 </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-whatsapp mr-2 mt-1 flex-shrink-0" />
                <p>Our services are free 4 all!</p>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp-dark text-white font-medium"
              >
                <MessageCircle className="mr-2 h-5 w-5" /> Start Chatting Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-whatsapp text-whatsapp hover:bg-whatsapp/10"
              >
                Browse Tutors
              </Button>
            </div> */}
          </div>

          {/* Right image/illustration */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden md:ml-auto max-w-md animate-float">
              <div className="bg-gradient-to-br from-whatsapp-light to-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-whatsapp rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Mosa Ai</h3>
                    <p className="text-xs text-gray-500">
                      Online • Quick Replies
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      Hi there! I'm Mosa, your math tutor. How can I help you
                      today?
                    </p>
                  </div>
                  <div className="bg-whatsapp/10 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    <p className="text-sm">
                      Hi Mosa! Please download physical sciences 2023 November
                      grade 12?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      Absolutely! Please wait while I send it to?
                    </p>
                  </div>
                </div>
                <div className="mt-3 border-t pt-3 text-center">
                  <p className="text-xs text-gray-500">
                    Mosa typically reply within seconds
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-tutoring-blue/10 to-whatsapp/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-tutoring-purple/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

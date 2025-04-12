import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-tutoring-blue to-whatsapp">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students who are getting personalized help,
            improving their grades, and building confidence through WhatsApp
            tutoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-tutoring-blue hover:bg-gray-100 font-medium"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Start Learning Now
            </Button>
            {/* <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              View Pricing Plans
            </Button> */}
          </div>
          <p className="mt-6 text-sm opacity-80">
            No credit card required to start..
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

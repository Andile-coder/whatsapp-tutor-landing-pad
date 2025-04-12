
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Pay As You Go",
      price: "$2",
      unit: "per minute",
      description: "Perfect for quick questions and homework help",
      features: [
        "No minimum session length",
        "No subscription required",
        "Pay only for what you use",
        "All subjects available",
        "Cancel anytime"
      ],
      buttonText: "Start Now",
      highlighted: false
    },
    {
      name: "Weekly Pass",
      price: "$49",
      unit: "per week",
      description: "Ideal for exam preparation and ongoing help",
      features: [
        "Unlimited questions for one week",
        "Priority tutor matching",
        "Access to premium tutors",
        "Study guides included",
        "24/7 support"
      ],
      buttonText: "Get Weekly Pass",
      highlighted: true
    },
    {
      name: "Monthly Plan",
      price: "$149",
      unit: "per month",
      description: "Best value for regular, ongoing tutoring needs",
      features: [
        "Unlimited tutoring all month",
        "Dedicated personal tutor",
        "Custom study plan",
        "Progress tracking",
        "Practice tests & materials"
      ],
      buttonText: "Subscribe Monthly",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees or long-term commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden ${
                plan.highlighted 
                  ? "border-2 border-whatsapp relative shadow-lg" 
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-whatsapp text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500"> {plan.unit}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className={`h-5 w-5 ${plan.highlighted ? "text-whatsapp" : "text-tutoring-blue"} mr-2 mt-0.5 flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? "bg-whatsapp hover:bg-whatsapp-dark" 
                      : "bg-tutoring-blue hover:bg-tutoring-darkblue"
                  } text-white`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500">All plans come with a 100% satisfaction guarantee</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

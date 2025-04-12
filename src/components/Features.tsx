
import { 
  Clock, 
  MessageSquare, 
  CreditCard, 
  GraduationCap, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Clock className="h-6 w-6 text-tutoring-blue" />,
      title: "24/7 Availability",
      description: "Get help any time of day or night, weekends and holidays included."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-whatsapp" />,
      title: "No App Switching",
      description: "Use WhatsApp, the messaging app you're already comfortable with."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-tutoring-orange" />,
      title: "Pay As You Go",
      description: "Only pay for the help you need, with no subscription required."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-tutoring-purple" />,
      title: "Qualified Tutors",
      description: "Learn from tutors with degrees from top universities and teaching experience."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Instant Connections",
      description: "Get matched with the right tutor in minutes, not days."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
      title: "Quality Guaranteed",
      description: "Not satisfied? We'll connect you with another tutor or refund your session."
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose WhatsApp Tutoring?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've transformed how tutoring works by bringing expert help directly to your favorite messaging app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

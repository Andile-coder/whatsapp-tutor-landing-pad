
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "High School Student",
      avatar: "/placeholder.svg", // Using placeholder for now
      stars: 5,
      text: "I was struggling with calculus and had a test the next day. My WhatsApp Tutor helped me understand the concepts in just one hour. I got an A- on my test!"
    },
    {
      name: "Maya Patel",
      role: "College Freshman",
      avatar: "/placeholder.svg",
      stars: 5,
      text: "Being able to send pictures of my chemistry problems and get step-by-step solutions right in WhatsApp is amazing. So much more convenient than scheduling traditional tutoring."
    },
    {
      name: "David Kim",
      role: "Graduate Student",
      avatar: "/placeholder.svg",
      stars: 4,
      text: "I use WhatsApp Tutor for help with my statistics coursework. The tutors are knowledgeable and patient. It's like having a study buddy available 24/7."
    },
    {
      name: "Sarah Martinez",
      role: "Parent",
      avatar: "/placeholder.svg",
      stars: 5,
      text: "My daughter was falling behind in algebra. Her WhatsApp tutor not only helped her catch up but also built her confidence. Now she enjoys math!"
    },
    {
      name: "James Wilson",
      role: "Adult Learner",
      avatar: "/placeholder.svg",
      stars: 5,
      text: "Returning to school after 10 years was intimidating. Having tutors I can message anytime has been a lifesaver. Worth every penny."
    },
    {
      name: "Emily Chen",
      role: "High School Senior",
      avatar: "/placeholder.svg",
      stars: 4,
      text: "WhatsApp Tutor helped me prepare for my SATs. I improved my math score by 120 points! The practice materials and explanations were excellent."
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied students who have improved their grades and confidence through WhatsApp tutoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm relative"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.stars 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              
              {/* Decorative quotation mark */}
              <div className="absolute top-4 right-4 text-gray-100 text-5xl font-serif">"</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
